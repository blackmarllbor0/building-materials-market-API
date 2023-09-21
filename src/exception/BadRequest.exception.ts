import { HttpException } from './HttpException';
import * as status from 'http-status';

export class BadRequestException extends HttpException {
  constructor(msg: string = 'something want wrong') {
    super(status.BAD_REQUEST, msg);
  }
}
