import { IDatabaseService } from '../database/database.service.interface';
import { IOrderDetailService } from './order-detail.service.interface';
import { CreateOrderDetailDto } from './dto/crateOrderDetail.dto';
import { OrderDetail } from './order-detail.entity';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { UpdateOrderDetailDro } from './dto/updateOrderDetail.dto';
import { OrderDetailAlreadyExistsException } from './exceptions/orderDetailAlreadyExists.exception';
import { OrderDetailNotFoundException } from './exceptions/orderDetailNotFound.exception';
import { BadRequestException } from '../exception/BadRequest.exception';

export class OrderDetailsService implements IOrderDetailService {
  private readonly table: string = 'order_detail';

  constructor(private readonly orderDetailRepository: IDatabaseService) {}

  public async create(createDto: CreateOrderDetailDto): Promise<OrderDetail> {
    let positionNumber: number | number[] = (
      await this.orderDetailRepository.selectAll(this.table, {
        orderId: createDto.orderId,
      } as OrderDetail)
    ).map(({ positionNumber }) => positionNumber);

    positionNumber = positionNumber.length
      ? Math.max(...positionNumber) + 1
      : 1;

    const orderDetail = await this.orderDetailRepository.selectAll(this.table, {
      orderId: createDto.orderId,
      productId: createDto.productId,
      isDeleted: 0,
    } as OrderDetail);

    if (orderDetail && orderDetail.length) {
      throw new OrderDetailAlreadyExistsException();
    }

    try {
      return this.orderDetailRepository.insert(this.table, {
        ...createDto,
        positionNumber,
      }) as unknown as OrderDetail;
    } catch (error) {
      throw new BadRequestException(
        `not found product with id ${createDto.productId} or order with id ${createDto.orderId}`,
      );
    }
  }

  public async getAll(
    orderId: number,
    limitOffset?: LimitOffsetQuery,
  ): Promise<OrderDetail[]> {
    const orderDetails = await this.orderDetailRepository.selectAll(
      this.table,
      { orderId, isDeleted: 0 } as OrderDetail,
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
      { id, orderId, isDeleted: 0 } as OrderDetail,
      { id } as OrderDetail,
    );

    if (!orderDetail) throw new OrderDetailNotFoundException(id);

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
      { id, orderId, isDeleted: 0 } as OrderDetail,
      { id } as OrderDetail,
    );

    if (!orderDetail) throw new OrderDetailNotFoundException(id);

    await this.orderDetailRepository.update(
      this.table,
      { isDeleted: 1 } as OrderDetail,
      { id, orderId } as OrderDetail,
    );
  }
}
