import { HttpException } from '../../exception/HttpException';
import { UNAUTHORIZED } from 'http-status';

export class WrongCredentialsException extends HttpException {
  constructor() {
    super(UNAUTHORIZED || 401, 'wrong credentials');
  }
}
