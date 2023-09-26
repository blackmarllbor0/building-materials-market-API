import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDeliveryDto {
  @IsString()
  @IsOptional()
  public addressFrom: string;

  @IsString()
  @IsOptional()
  public addressTo: string;

  @IsNumber()
  @IsOptional()
  public amount: number;

  @IsDate()
  @IsOptional()
  public approximateDate: Date;
}
