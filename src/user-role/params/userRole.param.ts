import { IsNumberString } from 'class-validator';

export class UserRoleIdParam {
  @IsNumberString()
  public userRoleId: number;
}
