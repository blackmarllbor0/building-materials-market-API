import { IsNumberString } from 'class-validator';

export class OrderPaymentTypeId {
  @IsNumberString()
  public orderPaymentTypeId: number;
}
