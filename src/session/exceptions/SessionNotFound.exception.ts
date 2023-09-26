import { NotFoundException } from '../../exception/NotFound.exception';

export class SessionNotFoundException extends NotFoundException {
  constructor(id?: number) {
    super(id ? `session with this id - ${id} not found` : 'sessions not found');
  }
}
