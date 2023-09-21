import { HttpException } from './HttpException';
import * as status from 'http-status';

export class NotFound extends HttpException {
  constructor(msg: string) {
    super(status.NOT_FOUND, msg);
  }
}
