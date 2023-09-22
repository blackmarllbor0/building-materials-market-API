import { IsNumberString } from 'class-validator';

export class UserIdParam {
  @IsNumberString()
  public userId: number;
}
