import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(2)
  @IsOptional()
  public name: string;

  @IsEmail()
  @IsOptional()
  public email: string;

  @IsPhoneNumber()
  @IsOptional()
  public phoneNumber: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  public password: string;
}
