import { HttpException } from '../../exception/HttpException';
import status from 'http-status';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super(status.CONFLICT, 'User already exists');
  }
}
