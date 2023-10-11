import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { CreateOrderPaymentTypeDto } from './dto/createOrderPaymenttype.dto';
import { OrderPaymentType } from './order-payment-type.entity';
import { UpdateOrderPaymentTypeDto } from './dto/updateOrderPaymentType.dto';

export interface IOrderPaymentTypeService {
  create(createDto: CreateOrderPaymentTypeDto): Promise<OrderPaymentType>;
  getAll(limitOffset?: LimitOffsetQuery): Promise<OrderPaymentType[]>;
  getById(id: number): Promise<OrderPaymentType>;
  updateById(
    id: number,
    updateDto: UpdateOrderPaymentTypeDto,
  ): Promise<OrderPaymentType>;
}
