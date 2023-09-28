import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';

class CreateOrderDetails {
  @IsNumber()
  @IsNotEmpty()
  public productId: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  public quantity: number;
}

export class CreateOrderDto {
  @IsNumber()
  public userId: number;

  @IsNumber()
  public orderPaymentTypeId: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetails)
  @IsOptional()
  public orderDetails?: CreateOrderDetails[];
}
