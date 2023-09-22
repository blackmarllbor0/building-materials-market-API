import { NotFoundException } from '../../exception/NotFound.exception';

export class OrderStatusNotFoundException extends NotFoundException {
  constructor(id?: number) {
    super(
      id
        ? `order status with this id - ${id} not found`
        : 'order statuses not found',
    );
  }
}
