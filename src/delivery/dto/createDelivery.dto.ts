import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @IsNumber()
  public orderId: number;

  @IsString()
  public addressFrom: string;

  @IsString()
  public addressTo: string;

  @IsNumber()
  public amount: number;

  @IsDateString()
  public approximateDate: Date;
}
