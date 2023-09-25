import { ConflictException } from '../../exception/Conflict.exception';

export class OrderAlreadyExistsException extends ConflictException {
  constructor() {
    super('order with this data already exists');
  }
}
