import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  public name: string;

  @IsString()
  public linkToWebsite: string;

  @IsPhoneNumber()
  public phoneNumber: string;

  @IsString()
  public linkToLogoImage: string;

  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(50)
  public description: string;
}
