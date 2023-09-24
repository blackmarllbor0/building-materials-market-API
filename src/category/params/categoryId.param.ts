import { IsNumberString } from 'class-validator';

export class CategoryIdParam {
  @IsNumberString()
  public categoryId: number;
}
