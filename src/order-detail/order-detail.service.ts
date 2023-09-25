import { IDatabaseService } from '../database/database.service.interface';
import { IOrderDetailService } from './order-detail.service.interface';
import { CreateOrderDetailDto } from './dto/crateOrderDetail.dto';
import { OrderDetail } from './order-detail.entity';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { UpdateOrderDetailDro } from './dto/updateOrderDetail.dto';
import { OrderDetailAlreadyExistsException } from './exceptions/orderDetailAlreadyExists.exception';
import { OrderDetailNotFoundException } from './exceptions/orderDetailNotFound.exception';

export class OrderDetailsService implements IOrderDetailService {
  private readonly table: string = 'order_detail';

  constructor(private readonly orderDetailRepository: IDatabaseService) {}

  public async create(createDto: CreateOrderDetailDto): Promise<OrderDetail> {
    try {
      return this.orderDetailRepository.insert(this.table, {
        ...createDto,
      }) as unknown as OrderDetail;
    } catch (error) {
      throw new OrderDetailAlreadyExistsException();
    }
  }

  public async getAll(
    orderId: number,
    limitOffset?: LimitOffsetQuery,
  ): Promise<OrderDetail[]> {
    const orderDetails = await this.orderDetailRepository.selectAll(
      this.table,
      { orderId } as OrderDetail,
      null,
      limitOffset,
    );

    if (!orderDetails.length) throw new OrderDetailNotFoundException();

    return orderDetails;
  }

  public async updateById(
    id: number,
    orderId: number,
    updateDto: UpdateOrderDetailDro,
  ): Promise<OrderDetail> {
    const orderDetail = await this.orderDetailRepository.selectOne(
      this.table,
      { id, orderId } as OrderDetail,
      { id } as OrderDetail,
    );

    if (orderDetail) throw new OrderDetailNotFoundException(id);

    try {
      return this.orderDetailRepository.update(
        this.table,
        { ...updateDto } as OrderDetail,
        { id, orderId } as OrderDetail,
      );
    } catch (error) {
      throw new OrderDetailAlreadyExistsException();
    }
  }

  public async deleteById(id: number, orderId: number): Promise<void> {
    const orderDetail = await this.orderDetailRepository.selectOne(
      this.table,
      { id, orderId } as OrderDetail,
      { id } as OrderDetail,
    );

    if (orderDetail) throw new OrderDetailNotFoundException(id);

    await this.orderDetailRepository.update(
      this.table,
      { isDeleted: 1 } as OrderDetail,
      { id, orderId } as OrderDetail,
    );
  }
}
