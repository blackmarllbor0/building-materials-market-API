import { IsString } from 'class-validator';

export class UpdateOrderPaymentTypeDto {
  @IsString()
  public name: string;
}
