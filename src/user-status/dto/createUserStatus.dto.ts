import { IsString } from 'class-validator';

export class CreateUserStatusDto {
  @IsString()
  public name: string;
}
