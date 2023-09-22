import { IsNumberString, Min } from 'class-validator';

export class LimitOffsetQuery {
  @IsNumberString()
  @Min(1)
  public limit: number;

  @IsNumberString()
  public offset: number;
}
