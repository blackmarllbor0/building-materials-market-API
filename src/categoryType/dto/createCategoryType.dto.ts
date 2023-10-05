import { IsString } from 'class-validator';

export class CreateCategoryTypeDto {
  @IsString()
  public name: string;
}
