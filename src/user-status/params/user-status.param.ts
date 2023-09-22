import { IsNumberString } from 'class-validator';

export class UserStatusIdParam {
  @IsNumberString()
  public userStatusId: number;
}
