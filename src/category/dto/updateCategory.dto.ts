import { IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  public name: string;

  @IsString()
  public categoryTypeId: number;
}
