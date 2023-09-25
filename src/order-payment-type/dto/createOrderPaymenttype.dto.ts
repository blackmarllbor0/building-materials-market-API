import { IsString } from 'class-validator';

export class CreateOrderPaymentTypeDto {
  @IsString()
  public name: string;
}
