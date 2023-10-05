import { HttpException } from '../../exception/HttpException';
import { UNAUTHORIZED } from 'http-status';

export class AuthenticationTokenMissingException extends HttpException {
  constructor() {
    super(UNAUTHORIZED || 401, 'authentication token missing');
  }
}
