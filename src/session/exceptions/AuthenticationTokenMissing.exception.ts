import { HttpException } from '../../exception/HttpException';
import * as status from 'http-status';

export class AuthenticationTokenMissingException extends HttpException {
  constructor() {
    super(status.UNAUTHORIZED, 'authentication token missing');
  }
}
