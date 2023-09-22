import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { CompanyNameQuery } from './params/companyTitle.query';
import { UpdateCompanyDto } from './dto/updateCompany.dto';

export interface ICompanyService {
  create(createDto: CreateCompanyDto): Promise<Company>;
  getAll(
    limitOffset?: LimitOffsetQuery,
    companyName?: CompanyNameQuery,
  ): Promise<Company[]>;
  getById(id: number): Promise<Company>;
  updateById(id: number, updateDto: UpdateCompanyDto): Promise<Company>;
  deleteById(id: number): Promise<void>;
}
