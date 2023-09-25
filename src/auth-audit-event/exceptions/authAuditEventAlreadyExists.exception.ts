import { ConflictException } from '../../exception/Conflict.exception';

export class AuthAuditEventAlreadyExistsException extends ConflictException {
  constructor() {
    super('auth audit event with this name already exists');
  }
}
