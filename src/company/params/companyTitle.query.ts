import { IsString } from 'class-validator';

export class CompanyNameQuery {
  @IsString()
  public companyName?: string;
}
