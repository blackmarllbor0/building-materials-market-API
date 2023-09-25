import { IsNumber, Min } from 'class-validator';

export class UpdateOrderDetailDro {
  @IsNumber()
  @Min(1)
  public quantity: number;
}
