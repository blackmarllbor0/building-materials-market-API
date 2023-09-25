import { ConflictException } from '../../exception/Conflict.exception';

export class OrderHistoryAlreadyExistsException extends ConflictException {
  constructor() {
    super('order history with this data already exists');
  }
}
