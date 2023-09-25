import { NotFoundException } from '../../exception/NotFound.exception';

export class OrderHistoryNotFound extends NotFoundException {
  constructor() {
    super('order histories not found');
  }
}
