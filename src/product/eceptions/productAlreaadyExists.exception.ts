import { ConflictException } from 'src/exception/Conflict.exception';

export class ProductAlreadyExitsException extends ConflictException {
  constructor() {
    super('product with this data already exists');
  }
}
