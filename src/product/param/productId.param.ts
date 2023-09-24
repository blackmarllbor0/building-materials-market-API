import { IsNumberString } from 'class-validator';

export class ProductIdParam {
  @IsNumberString()
  public productId: number;
}
