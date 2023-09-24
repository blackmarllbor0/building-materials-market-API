import { ConflictException } from '../../exception/Conflict.exception';

export class CategoryAlreadyExistException extends ConflictException {
  constructor() {
    super('category with this name already exists');
  }
}
