import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateFeedbackDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  @IsOptional()
  public rating: number;

  @IsString()
  @IsOptional()
  public title: string;

  @IsString()
  @IsOptional()
  public message: string;
}
