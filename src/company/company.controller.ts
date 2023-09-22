import { BaseController } from '../app/base.controller';
import { ICompanyService } from './company.service.interface';
import { IUserService } from '../user/user.service.interface';
import { NextFunction, Request, Response } from 'express';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { Company } from './company.entity';
import { validateMiddleware } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { UserRoleEnum } from '../user-role/userRole.enun';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { CompanyNameQuery } from './params/companyTitle.query';
import { CompanyIdParam } from './params/companyId.param';
import { UpdateCompanyDto } from './dto/updateCompany.dto';

export class CompanyController extends BaseController {
  constructor(
    private readonly companyService: ICompanyService,
    private readonly userService: IUserService,
  ) {
    super('/companies');
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      this.path,
      validateMiddleware(CreateCompanyDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.create.bind(this),
    );

    this.router.get(this.path, this.getAll.bind(this));

    this.router.get(`${this.path}/:companyId"`, this.getById.bind(this));

    this.router.patch(
      `${this.path}/:companyId`,
      validateMiddleware(UpdateCompanyDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.updateById.bind(this),
    );

    this.router.delete(
      `${this.path}/:companyId`,
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.deleteById.bind(this),
    );
  }

  public async create(
    { body }: Request<any, any, CreateCompanyDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Company>> {
    try {
      const company = await this.companyService.create(body);
      return this.created(res, company);
    } catch (error) {
      next(error);
    }
  }

  public async getAll(
    { query }: Request<any, any, any, LimitOffsetQuery & CompanyNameQuery>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Company[]>> {
    try {
      const companies = await this.companyService.getAll(query);
      return this.ok(res, companies);
    } catch (error) {
      next(error);
    }
  }

  public async getById(
    { params: { companyId } }: Request<CompanyIdParam>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Company>> {
    try {
      const company = await this.companyService.getById(companyId);
      return this.ok(res, company);
    } catch (error) {
      next(error);
    }
  }

  public async updateById(
    {
      params: { companyId },
      body,
    }: Request<CompanyIdParam, any, UpdateCompanyDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Company>> {
    try {
      const updatedCompany = await this.companyService.updateById(
        companyId,
        body,
      );
      return this.ok(res, updatedCompany);
    } catch (error) {
      next(error);
    }
  }

  public async deleteById(
    { params: { companyId } }: Request<CompanyIdParam>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await this.companyService.deleteById(companyId);
      return this.ok(res);
    } catch (error) {
      next(error);
    }
  }
}
