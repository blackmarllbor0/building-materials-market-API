import { BaseController } from '../app/base.controller';
import { ICategoryTypeService } from './categoryType.interface';
import { IUserService } from '../user/user.service.interface';
import { NextFunction, Request, Response } from 'express';
import { CreateCategoryTypeDto } from './dto/createCategoryType.dto';
import { CategoryType } from './categoryType.entity';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { UpdateCategoryTypeDto } from './dto/updateCategoryType.dto';
import { validateMiddleware } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { UserRoleEnum } from '../user-role/userRole.enun';

export class CategoryTypeController extends BaseController {
  constructor(
    private readonly categoryTypeService: ICategoryTypeService,
    private readonly userService: IUserService,
  ) {
    super('/category-types');
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      this.path,
      validateMiddleware(CreateCategoryTypeDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.create.bind(this),
    );

    this.router.get(this.path, this.getAll.bind(this));

    this.router.get(`${this.path}/:categoryTypeId`, this.getById.bind(this));

    this.router.put(
      `${this.path}/:categoryTypeId`,
      validateMiddleware(UpdateCategoryTypeDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.updateById.bind(this),
    );
  }

  public async create(
    { body }: Request<any, any, CreateCategoryTypeDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<CategoryType>> {
    try {
      const categoryType = await this.categoryTypeService.create(body);
      return this.created(res, categoryType);
    } catch (error) {
      next(error);
    }
  }

  public async getAll(
    {
      query: { categoryTypeName, limit, offset },
    }: Request<any, any, any, LimitOffsetQuery & { categoryTypeName: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<CategoryType[]>> {
    try {
      const categoryTypes = await this.categoryTypeService.getAll(
        { offset, limit },
        categoryTypeName,
      );
      return this.ok(res, categoryTypes);
    } catch (error) {
      next(error);
    }
  }

  public async getById(
    { params: { categoryTypeId } }: Request<{ categoryTypeId: number }>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<CategoryType>> {
    try {
      const categoryType =
        await this.categoryTypeService.getById(categoryTypeId);
      return this.ok(res, categoryType);
    } catch (error) {
      next(error);
    }
  }

  public async updateById(
    {
      params: { categoryTypeId },
      body,
    }: Request<{ categoryTypeId: number }, any, UpdateCategoryTypeDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<CategoryType>> {
    try {
      const updatedCategoryType = await this.categoryTypeService.updateById(
        categoryTypeId,
        body,
      );
      return this.ok(res, updatedCategoryType);
    } catch (error) {
      next(error);
    }
  }
}
