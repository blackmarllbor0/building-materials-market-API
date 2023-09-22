import { HttpException } from './HttpException';
import * as status from 'http-status';

export class NotFoundException extends HttpException {
  constructor(msg: string) {
    super(status.NOT_FOUND, msg);
  }
}
