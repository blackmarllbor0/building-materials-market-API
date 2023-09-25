import { IsNumberString } from 'class-validator';

export class FeedbackIdParam {
  @IsNumberString()
  public feedbackId: number;
}
