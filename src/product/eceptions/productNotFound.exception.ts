import { NotFoundException } from 'src/exception/NotFound.exception';

export class ProductNotFoundException extends NotFoundException {
  constructor(id?: number) {
    super(id ? `product with this id - ${id} not found` : 'products not found');
  }
}
