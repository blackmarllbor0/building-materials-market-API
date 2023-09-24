import { IsString } from 'class-validator';

export class CategoryNameQuery {
  @IsString()
  public categoryName: string;
}
