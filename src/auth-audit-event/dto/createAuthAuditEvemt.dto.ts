import { IsString } from 'class-validator';

export class CreateAuthAuditEventDto {
  @IsString()
  public name: string;
}
