import { NotFoundException } from '../../exception/NotFound.exception';

export class OrderNotFoundException extends NotFoundException {
  constructor(id?: number) {
    super(id ? `order with this id - ${id} not found` : 'orders not found');
  }
}
