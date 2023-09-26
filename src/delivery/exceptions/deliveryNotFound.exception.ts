import { NotFoundException } from '../../exception/NotFound.exception';

export class DeliveryNotFoundException extends NotFoundException {
  constructor(orderId: number) {
    super(`delivery for order with id ${orderId} not found`);
  }
}
