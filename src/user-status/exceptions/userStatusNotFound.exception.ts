import { NotFoundException } from '../../exception/NotFound.exception';

export class UserStatusNotFound extends NotFoundException {
  constructor(id?: number) {
    super(
      !id
        ? 'user status not found'
        : `user status with this id - ${id} not found`,
    );
  }
}
