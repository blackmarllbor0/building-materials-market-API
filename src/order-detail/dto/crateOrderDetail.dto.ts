import { IsNumber, IsOptional, Min } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNumber()
  @IsOptional()
  public orderId: number;

  @IsNumber()
  public productId: number;

  @IsNumber()
  @Min(1)
  public quantity: number;
}
