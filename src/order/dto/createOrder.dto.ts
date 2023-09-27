import { IsArray, IsNumber, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  public userId: number;

  @IsNumber()
  public orderPaymentTypeId: number;

  @IsArray()
  @IsOptional()
  public productsId?: number[];
}
