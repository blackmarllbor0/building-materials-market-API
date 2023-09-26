import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { Delivery } from './delivery.entity';
import { CreateDeliveryDto } from './dto/createDelivery.dto';
import { UpdateDeliveryDto } from './dto/updateDelivery.dto';

export interface IDeliveryService {
  create(createDto: CreateDeliveryDto): Promise<Delivery>;
  getDelivery(
    orderId?: number,
    limitOffset?: LimitOffsetQuery,
  ): Promise<Delivery[]>;
  updateDelivery(
    orderId: number,
    updateDto: UpdateDeliveryDto,
  ): Promise<Delivery>;
  deleteDelivery(orderId: number): Promise<void>;
}
