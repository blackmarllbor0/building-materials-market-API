import { IDatabaseService } from '../database/database.service.interface';
import { IOrderService } from './order.service.interface';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Order } from './order.entity';
import { OrderStatusIdParam } from '../order-status/params/order-status-id.param';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { UserIdParam } from '../user/param/userId.param';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { OrderHistory } from '../order-history/order-history.entity';
import { IOrderHistoryService } from '../order-history/order-history.service.interface';
import { OrderAlreadyExistsException } from './exception/orderAlreadyExists.exception';
import { OrderNotFoundException } from './exception/orderNotFound.exception';
import { OrderIdParam } from './params/orderId.param';
import { IOrderDetailService } from '../order-detail/order-detail.service.interface';
import { OrderDetail } from '../order-detail/order-detail.entity';
import { NotFoundException } from '../exception/NotFound.exception';

export class OrderService implements IOrderService {
  private readonly table: string = 'order';
  constructor(
    private readonly orderRepository: IDatabaseService,
    private readonly orderHistoryService: IOrderHistoryService,
    private readonly orderDetailsService: IOrderDetailService,
  ) {}

  async create(createDto: CreateOrderDto): Promise<Order> {
    const orderDetails = createDto.orderDetails;
    delete createDto['orderDetails'];

    const orderNumber = this.genOrderNumber();

    const order = await this.orderRepository.insert(this.table, {
      ...createDto,
      number: orderNumber,
      orderStatusId: 1,
    } as Order);

    if (orderDetails && orderDetails.length) {
      let positionNumber = 0;
      for (const { productId, quantity } of orderDetails) {
        positionNumber++;
        try {
          await this.orderRepository.insert('order_detail', {
            orderId: order.id,
            productId,
            quantity,
            positionNumber,
          } as OrderDetail);
        } catch (error) {
          this.deleteById(order.id);
          await this.orderRepository.update(
            'order_detail',
            {
              orderId: order.id,
              productId,
            } as OrderDetail,
            { isDeleted: 1 } as OrderDetail,
          );
          throw new NotFoundException(`product with id ${productId} not found`);
        }
      }
    }

    await this.orderRepository.commit();
    return order;
  }

  private genOrderNumber(): number {
    return Math.floor(Math.random() * 9999);
  }

  async getAll(
    userId?: UserIdParam,
    limitOffset?: LimitOffsetQuery,
    orderStatusId?: OrderStatusIdParam,
  ): Promise<Order[]> {
    const where = { isCanceled: 0 } as unknown as Order;
    if (userId && userId.userId) {
      where.userId = userId.userId;
    }

    if (orderStatusId && orderStatusId.orderStatusId) {
      where.orderStatusId = orderStatusId.orderStatusId;
    }

    const orders = await this.orderRepository.selectAll(
      this.table,
      where,
      null,
      limitOffset,
    );

    if (!orders.length) throw new OrderNotFoundException();

    return orders;
  }

  async getById(id: number): Promise<Order> {
    const order = await this.orderRepository.selectOne(this.table, {
      id,
      isCanceled: 0,
    } as Order);

    if (!order) throw new OrderNotFoundException(id);

    return order;
  }

  async updateById(id: number, updateDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.selectOne(
      this.table,
      { id, isCanceled: 0 } as Order,
      { id } as Order,
    );

    if (!order) throw new OrderNotFoundException(id);

    try {
      const updatedOrder = await this.orderRepository.update(
        this.table,
        {
          ...updateDto,
          updateDate: new Date(),
        } as Order,
        { id } as Order,
      );

      await this.orderHistoryService.create({
        orderId: updatedOrder.id,
        orderStatusId: updatedOrder.orderStatusId,
        totalCost: updatedOrder.totalCost,
        totalQuantity: updatedOrder.totalQuantity,
      });

      return updatedOrder;
    } catch (error) {
      throw new OrderAlreadyExistsException();
    }
  }

  async deleteById(id: number): Promise<void> {
    const { orderStatusId, totalCost, totalQuantity } = await this.getById(id);

    await this.orderHistoryService.create({
      orderId: id,
      totalCost,
      orderStatusId,
      totalQuantity,
    });

    await this.orderRepository.update(
      this.table,
      { isCanceled: 1 } as Order,
      { id } as Order,
    );
  }

  public async getHistory(
    id: OrderIdParam,
    limitOffset?: LimitOffsetQuery,
  ): Promise<OrderHistory[]> {
    return this.orderHistoryService.getAll(id, limitOffset);
  }
}
