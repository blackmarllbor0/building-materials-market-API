import { IsNumberString } from 'class-validator';

export class OrderIdParam {
  @IsNumberString()
  public orderId: number;
}
