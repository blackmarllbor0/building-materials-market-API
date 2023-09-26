import { ConflictException } from '../../exception/Conflict.exception';

export class DeliveryAlreadyExistsException extends ConflictException {
  constructor() {
    super('delivery for this order already exists');
  }
}
