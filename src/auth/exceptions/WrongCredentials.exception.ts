import { HttpException } from '../../exception/HttpException';
import status from 'http-status';

export class WrongCredentialsException extends HttpException {
  constructor() {
    super(status.UNAUTHORIZED, 'wrong credentials');
  }
}
