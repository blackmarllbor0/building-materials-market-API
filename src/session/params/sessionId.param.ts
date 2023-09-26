import { IsNumberString } from 'class-validator';

export class SessionIdParam {
  @IsNumberString()
  public sessionId: number;
}
