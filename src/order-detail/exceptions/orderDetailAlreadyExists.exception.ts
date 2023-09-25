import { ConflictException } from '../../exception/Conflict.exception';

export class OrderDetailAlreadyExistsException extends ConflictException {
  constructor() {
    super('order detail with this data already exits');
  }
}
