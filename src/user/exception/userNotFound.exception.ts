import { NotFoundException } from '../../exception/NotFound.exception';

export class UserNotFoundException extends NotFoundException {
  constructor(id?: number) {
    super(id ? `user with this id - ${id} not found` : 'users not found');
  }
}
