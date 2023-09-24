import { IsString } from 'class-validator';

export class ProductNameQuery {
  @IsString()
  public productName: string;
}
