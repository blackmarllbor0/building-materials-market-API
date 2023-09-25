import { NotFoundException } from '../../exception/NotFound.exception';

export class OrderDetailNotFoundException extends NotFoundException {
  constructor(id?: number) {
    super(
      id
        ? `order detail with this id - ${id} not found`
        : 'order details not found',
    );
  }
}
