import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { CreateOrderStatusDto } from './dto/createOrderStatus.dto';
import { OrderStatus } from './order-status.entity';
import { UpdateOrderStatusDto } from './dto/updateOrderStatus.dto';

export interface IOrderStatusService {
  create(createdDto: CreateOrderStatusDto): Promise<OrderStatus>;
  getAll(limitOffset?: LimitOffsetQuery): Promise<OrderStatus[]>;
  updateById(
    id: number,
    updatedDto: UpdateOrderStatusDto,
  ): Promise<OrderStatus>;
}
