import { HttpException } from './HttpException';
import * as status from 'http-status';

export class ConflictException extends HttpException {
  constructor(msg: string) {
    super(status.CONFLICT, msg);
  }
}
