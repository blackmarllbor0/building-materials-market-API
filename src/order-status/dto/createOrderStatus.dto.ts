import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateOrderStatusDto {
  @IsNumber()
  @Min(1)
  @Max(999)
  public code: number;

  @IsString()
  public name: string;
}
