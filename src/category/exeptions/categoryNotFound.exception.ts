import { NotFoundException } from '../../exception/NotFound.exception';

export class CategoryNotFoundException extends NotFoundException {
  constructor(id?: number, name?: string) {
    super(
      id
        ? `category with this id - ${id} not found`
        : name
        ? `category with this name - ${name} not found`
        : 'categories not found',
    );
  }
}
