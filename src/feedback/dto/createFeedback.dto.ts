import { IsNumber, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateFeedbackDto {
  @IsNumber()
  public userId: number;

  @IsNumber()
  public productId: number;

  @IsNumber()
  public companyId: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  public rating: number;

  @IsString()
  public title: string;

  @IsString()
  @MinLength(50)
  public message: string;
}
