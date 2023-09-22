import { NotFoundException } from '../../exception/NotFound.exception';

export class UserRoleNotFound extends NotFoundException {
  constructor(id?: number) {
    super(
      !id ? 'user role not found' : `user role with this id - ${id} not found`,
    );
  }
}
