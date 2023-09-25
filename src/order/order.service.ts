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
import { OrderStatusEnum } from '../order-status/order-status.enum';

export class OrderService implements IOrderService {
  private readonly table: string = 'order';
  constructor(
    private readonly orderRepository: IDatabaseService,
    private readonly orderHistoryService: IOrderHistoryService,
  ) {}

  create(createDto: CreateOrderDto): Promise<Order> {
    try {
      const number = this.genOrderNumber();
      return this.orderRepository.insert(this.table, {
        ...createDto,
        orderStatusId: OrderStatusEnum.decoration,
        number,
      } as Order);
    } catch (error) {
      throw new OrderAlreadyExistsException();
    }
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
