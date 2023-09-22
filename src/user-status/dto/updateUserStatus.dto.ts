import { IsString } from 'class-validator';

export class UpdateUserStatusDto {
  @IsString()
  public name: string;
}
