import { IsNumberString } from 'class-validator';

export class OrderStatusIdParam {
  @IsNumberString()
  orderStatusId: number;
}
