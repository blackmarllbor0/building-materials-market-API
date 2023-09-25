import { IsNumber } from 'class-validator';

export class CreateOrderHistoryDto {
  @IsNumber()
  public orderStatusId: number;

  @IsNumber()
  public orderId: number;

  @IsNumber()
  public totalQuantity: number;

  @IsNumber()
  public totalCost: number;
}
