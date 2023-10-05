import { IsString } from 'class-validator';

export class UpdateCategoryTypeDto {
  @IsString()
  public name: string;
}
