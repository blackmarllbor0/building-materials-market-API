import { ConflictException } from '../../exception/Conflict.exception';

export class UserStatusAlreadyExists extends ConflictException {
  constructor() {
    super('user status with this name already exists');
  }
}
