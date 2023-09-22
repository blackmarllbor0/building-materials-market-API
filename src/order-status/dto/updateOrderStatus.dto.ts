import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsNumber()
  @Min(1)
  @Max(999)
  @IsOptional()
  public code: number;

  @IsString()
  @IsOptional()
  public name: string;
}
