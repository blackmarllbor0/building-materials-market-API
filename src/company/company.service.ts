import { IDatabaseService } from '../database/database.service.interface';
import { ICompanyService } from './company.service.interface';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { Company } from './company.entity';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { UpdateCompanyDto } from './dto/updateCompany.dto';
import { CompanyNameQuery } from './params/companyTitle.query';
import { CompanyAlreadyExistsException } from './exception/companyAlreadyExists.exception';
import { CompanyNotFoundException } from './exception/companyNotFound.exception';

export class CompanyService implements ICompanyService {
  private readonly table: string = 'company';

  constructor(private readonly companyRepository: IDatabaseService) {}

  public async create(createDto: CreateCompanyDto): Promise<Company> {
    try {
      const company = await this.companyRepository.insert(this.table, {
        ...createDto,
        isDeleted: 0,
      } as Company);

      return company;
    } catch (error) {
      throw new CompanyAlreadyExistsException();
    }
  }

  public async getAll(
    limitOffset?: LimitOffsetQuery,
    companyName?: CompanyNameQuery,
  ): Promise<Company[]> {
    const isCompanyName = () =>
      companyName && companyName.companyName
        ? { name: companyName.companyName }
        : null;

    const companies = await this.companyRepository.selectAll<Company>(
      this.table,
      { ...isCompanyName(), isDeleted: 0 } as Company,
      null,
      limitOffset,
    );

    if (!companies) {
      throw new CompanyNotFoundException(null, companyName.companyName);
    }

    return companies;
  }

  async getById(id: number): Promise<Company> {
    const company = await this.companyRepository.selectOne(this.table, {
      id,
      isDeleted: 0,
    } as Company);

    if (!company) throw new CompanyNotFoundException(id);

    return company;
  }

  public async updateById(
    id: number,
    updateDto: UpdateCompanyDto,
  ): Promise<Company> {
    const company = await this.companyRepository.selectOne<Company>(
      this.table,
      { id, isDeleted: 0 } as Company,
      { id } as Company,
    );

    if (!company) throw new CompanyNotFoundException(id);

    try {
      const updatedCompany = await this.companyRepository.update(
        this.table,
        {
          ...updateDto,
          updateDate: new Date(),
        } as Company,
        { id } as Company,
      );

      return updatedCompany;
    } catch (error) {
      throw new CompanyAlreadyExistsException();
    }
  }

  async deleteById(id: number): Promise<void> {
    const company = await this.companyRepository.selectOne<Company>(
      this.table,
      { id, isDeleted: 0 } as Company,
      { id } as Company,
    );

    if (!company) throw new CompanyNotFoundException(id);

    await this.companyRepository.update(
      this.table,
      { isDeleted: 1 } as Company,
      { id } as Company,
    );
  }
}
