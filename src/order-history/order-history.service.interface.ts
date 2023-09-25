import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { CreateOrderHistoryDto } from './dto/createOrderHisotry.dto';
import { OrderHistory } from './order-history.entity';
import { OrderIdParam } from '../order/params/orderId.param';

export interface IOrderHistoryService {
  create(createDto: CreateOrderHistoryDto): Promise<OrderHistory>;
  getAll(
    orderId: OrderIdParam,
    limitOffset?: LimitOffsetQuery,
  ): Promise<OrderHistory[]>;
}
