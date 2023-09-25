import { IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  public userId: number;

  @IsNumber()
  public orderPaymentTypeId: number;
}
