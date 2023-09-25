import { NotFoundException } from '../exception/NotFound.exception';

export class OrderPaymentTypeNotFoundException extends NotFoundException {
  constructor(id?: number) {
    super(
      id
        ? `order payment type with this id - ${id} not found`
        : 'order payment types not found',
    );
  }
}
