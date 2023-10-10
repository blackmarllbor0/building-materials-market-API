import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateOrderDetailDro {
  @IsNumber()
  @Min(1)
  @IsOptional()
  public quantity: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  public price: number;
}
