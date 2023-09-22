import { ConflictException } from '../../exception/Conflict.exception';

export class OrderStatusAlreadyExists extends ConflictException {
  constructor() {
    super('order status with this data already exists');
  }
}
