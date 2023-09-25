import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { CreateOrderDto } from './dto/createOrder.dto';
import { Order } from './order.entity';
import { UserIdParam } from '../user/param/userId.param';
import { OrderStatusIdParam } from '../order-status/params/order-status-id.param';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { OrderHistory } from '../order-history/order-history.entity';
import { OrderIdParam } from './params/orderId.param';

export interface IOrderService {
  create(createDto: CreateOrderDto): Promise<Order>;
  getAll(
    userId?: UserIdParam,
    limitOffset?: LimitOffsetQuery,
    orderStatusId?: OrderStatusIdParam,
  ): Promise<Order[]>;
  getById(id: number): Promise<Order>;
  updateById(id: number, updateDto: UpdateOrderDto): Promise<Order>;
  deleteById(id: number): Promise<void>;
  getHistory(
    id: OrderIdParam,
    limitOffset?: LimitOffsetQuery,
  ): Promise<OrderHistory[]>;
}
