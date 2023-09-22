import { IsNumberString } from 'class-validator';

export class CompanyIdParam {
  @IsNumberString()
  public companyId: number;
}
