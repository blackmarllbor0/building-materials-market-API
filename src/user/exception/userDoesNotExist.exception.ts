import { NotFoundException } from '../../exception/NotFound.exception';

export class UserDoesNotExists extends NotFoundException {
  constructor() {
    super('the user does not exist or has been deleted');
  }
}
