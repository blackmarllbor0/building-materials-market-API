import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class LogInDto {
  @IsEmail()
  @IsOptional()
  public email: string;

  @IsPhoneNumber()
  @IsOptional()
  public phoneNumber: string;

  @IsString()
  @MinLength(8)
  public password: string;
}
