import { IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsNumber()
  @IsOptional()
  public orderPaymentTypeId: number;

  @IsNumber()
  @IsOptional()
  public orderStatusId: number;

  @IsNumber()
  @IsOptional()
  public totalCost: number;

  @IsNumber()
  @IsOptional()
  public totalQuantity: number;
}
