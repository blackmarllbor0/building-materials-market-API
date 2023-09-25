import { IsNumberString } from 'class-validator';

export class OrderDetailIdParam {
  @IsNumberString()
  public orderDetailId: number;
}
