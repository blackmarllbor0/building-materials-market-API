import { HttpException } from '../../exception/HttpException';
import * as status from 'http-status';

export class UserIdNotAdmin extends HttpException {
  constructor() {
    super(status.FORBIDDEN, "user's not a administrator");
  }
}
