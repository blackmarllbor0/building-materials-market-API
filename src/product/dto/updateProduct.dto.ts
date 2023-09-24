import { IsNumber, IsString, Max, Min, MinLength } from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  public companyId: number;

  @IsNumber()
  public categoryId: number;

  @IsNumber()
  @Min(1)
  public quantity: number;

  @IsNumber()
  @Min(1)
  public price: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  public rating: number;

  @IsString()
  public linkToImages: string;

  @IsString()
  public title: string;

  @IsString()
  @MinLength(50)
  public description: string;
}
