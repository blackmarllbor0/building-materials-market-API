import { IsNumberString } from 'class-validator';

export class AuthAuditEventIdParam {
  @IsNumberString()
  public authAuditEventId: number;
}
