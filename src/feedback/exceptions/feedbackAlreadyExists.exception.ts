import { ConflictException } from '../../exception/Conflict.exception';

export class FeedbackAlreadyExistsException extends ConflictException {
  constructor() {
    super('feedback with this data already exists');
  }
}
