import { ConflictException } from '../../exception/Conflict.exception';

export class OrderPaymentTypeAlreadyExistsException extends ConflictException {
  constructor() {
    super('order payment type with this data already exists');
  }
}
