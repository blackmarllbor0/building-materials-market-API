import { ConflictException } from '../../exception/Conflict.exception';

export class UserAlreadyExistsException extends ConflictException {
  constructor() {
    super('User already exists');
  }
}
