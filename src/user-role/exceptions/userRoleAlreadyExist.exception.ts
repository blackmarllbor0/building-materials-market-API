import { ConflictException } from '../../exception/Conflict.exception';

export class UserRoleWithThisNameAlreadyExist extends ConflictException {
  constructor() {
    super('user role with this name already exist');
  }
}
