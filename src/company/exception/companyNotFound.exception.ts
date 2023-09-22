import { NotFoundException } from '../../exception/NotFound.exception';

export class CompanyNotFoundException extends NotFoundException {
  constructor(id?: number, name?: string) {
    super(
      id
        ? `company with this id - ${id} not found`
        : name
        ? `company with this name not found`
        : 'companies not found',
    );
  }
}
