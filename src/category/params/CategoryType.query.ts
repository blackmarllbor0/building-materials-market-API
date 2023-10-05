import { IsNumberString } from 'class-validator';

export class CategoryTypeQuery {
  @IsNumberString()
  public categoryTypeId: number;
}
