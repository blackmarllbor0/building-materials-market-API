import { IsString, IsEmail, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsPhoneNumber()
  public phoneNumber: string;

  @IsString()
  @MinLength(8)
  public password: string;
}
