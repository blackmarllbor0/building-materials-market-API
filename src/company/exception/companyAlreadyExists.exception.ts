import { ConflictException } from '../../exception/Conflict.exception';

export class CompanyAlreadyExistsException extends ConflictException {
  constructor() {
    super('company with this data already exists');
  }
}
