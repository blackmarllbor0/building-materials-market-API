import { IDatabaseService } from '../database/database.service.interface';
import { IOrderStatusService } from './order-status.service.interface';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { CreateOrderStatusDto } from './dto/createOrderStatus.dto';
import { UpdateOrderStatusDto } from './dto/updateOrderStatus.dto';
import { OrderStatus } from './order-status.entity';
import { OrderStatusNotFoundException } from './exceptions/orderStatusNotFound.exception';
import { OrderStatusAlreadyExists } from './exceptions/orderStatusAlreadyExists.exception';
import { BadRequestException } from '../exception/BadRequest.exception';
import { CONFLICT } from 'http-status';

export class OrderStatusService implements IOrderStatusService {
  private readonly table: string = 'order_status';
  constructor(private readonly orderStatusRepository: IDatabaseService) {}

  public async create(createdDto: CreateOrderStatusDto): Promise<OrderStatus> {
    try {
      return this.orderStatusRepository.insert<OrderStatus>(
        this.table,
        createdDto as OrderStatus,
      );
    } catch (error) {
      if (error?.status == CONFLICT) {
        throw new OrderStatusAlreadyExists();
      }

      throw new BadRequestException(error.message);
    }
  }

  public async getAll(limitOffset?: LimitOffsetQuery): Promise<OrderStatus[]> {
    const orderStatuses =
      await this.orderStatusRepository.selectAll<OrderStatus>(
        this.table,
        null,
        null,
        limitOffset,
      );

    if (!orderStatuses.length) {
      throw new OrderStatusNotFoundException();
    }

    return orderStatuses;
  }

  public async updateById(
    id: number,
    updatedDto: UpdateOrderStatusDto,
  ): Promise<OrderStatus> {
    const userRole = await this.orderStatusRepository.selectOne(this.table, {
      id,
    } as OrderStatus);

    if (!userRole) {
      throw new OrderStatusNotFoundException(id);
    }

    try {
      return this.orderStatusRepository.update<OrderStatus>(
        this.table,
        { ...updatedDto, updateDate: new Date() } as OrderStatus,
        {
          id,
        } as OrderStatus,
      );
    } catch (error) {
      if (error?.status == CONFLICT) {
        throw new OrderStatusAlreadyExists();
      }

      throw new BadRequestException(error.message);
    }
  }
}
