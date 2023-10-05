import { HttpException } from '../../exception/HttpException';
import { UNAUTHORIZED } from 'http-status';

export class TokenIsNotValid extends HttpException {
  constructor() {
    super(UNAUTHORIZED || 401, 'token is not valid');
  }
}
