import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  @IsOptional()
  public companyId: number;

  @IsNumber()
  @IsOptional()
  public categoryId: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  public quantity: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  public price: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  public rating: number;

  @IsString()
  @IsOptional()
  public linkToImages: string;

  @IsString()
  @IsOptional()
  public title: string;

  @IsString()
  @MinLength(50)
  @IsOptional()
  public description: string;
}
