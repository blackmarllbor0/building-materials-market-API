import { IsString } from 'class-validator';

export class UpdateAuthAuditEventDto {
  @IsString()
  public name: string;
}
