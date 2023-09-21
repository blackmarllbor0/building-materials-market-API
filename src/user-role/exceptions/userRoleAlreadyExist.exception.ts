import { HttpException } from '../../exception/HttpException';
import * as status from 'http-status';

export class UserRoleWithThisNameAlreadyExist extends HttpException {
  constructor() {
    super(status.CONFLICT, 'user role with this name already exist');
  }
}
