import { HttpException } from '../../exception/HttpException';
import * as status from 'http-status';

export class TokenIsNotValid extends HttpException {
  constructor() {
    super(status.UNAUTHORIZED, 'token is not valid');
  }
}
