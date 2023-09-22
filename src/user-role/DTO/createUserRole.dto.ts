import { IsString } from 'class-validator';

export class CreateUserRoleDto {
  @IsString()
  public name: string;
}
