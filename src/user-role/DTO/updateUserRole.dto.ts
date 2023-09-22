import { IsString } from 'class-validator';

export class UpdateUserRoleDto {
  @IsString()
  public name: string;
}
