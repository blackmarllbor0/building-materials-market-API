import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { CreateOrderDetailDto } from './dto/crateOrderDetail.dto';
import { OrderDetail } from './order-detail.entity';
import { UpdateOrderDetailDro } from './dto/updateOrderDetail.dto';

export interface IOrderDetailService {
  create(createDto: CreateOrderDetailDto): Promise<OrderDetail>;
  getAll(
    orderId: number,
    limitOffset?: LimitOffsetQuery,
  ): Promise<OrderDetail[]>;
  updateById(
    id: number,
    orderId: number,
    updateDto: UpdateOrderDetailDro,
  ): Promise<OrderDetail>;
  deleteById(id: number, orderId: number): Promise<void>;
}
