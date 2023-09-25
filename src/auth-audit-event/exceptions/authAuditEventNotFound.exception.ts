import { NotFoundException } from '../../exception/NotFound.exception';

export class AuthAuditEventNotFoundException extends NotFoundException {
  constructor(id?: number) {
    super(
      id
        ? `auth audit event with this id - ${id} not found`
        : 'auth audit events not found',
    );
  }
}
