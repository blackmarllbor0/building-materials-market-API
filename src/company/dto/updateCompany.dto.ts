import {
  IsOptional,
  IsString,
  IsEmail,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';

export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  public name: string;

  @IsString()
  @IsOptional()
  public linkToWebsite: string;

  @IsPhoneNumber()
  @IsOptional()
  public phoneNumber: string;

  @IsString()
  @IsOptional()
  public linkToLogoImage: string;

  @IsEmail()
  @IsOptional()
  public email: string;

  @IsString()
  @MinLength(50)
  @IsOptional()
  public description: string;
}
