import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../app/base.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateMiddleware } from '../middleware/validate.middleware';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { UserRoleEnum } from '../user-role/userRole.enun';
import { IUserService } from '../user/user.service.interface';
import { Category } from './category.entity';
import { ICategoryService } from './category.service.interface';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { CategoryIdParam } from './params/categoryId.param';
import { CategoryNameQuery } from './params/categoryName.query';
import { CategoryTypeQuery } from './params/CategoryType.query';

export class CategoryController extends BaseController {
  constructor(
    private readonly categoryService: ICategoryService,
    private readonly userService: IUserService,
  ) {
    super('/categories');
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      this.path,
      validateMiddleware(CreateCategoryDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.create.bind(this),
    );

    this.router.get(this.path, this.getAll.bind(this));

    this.router.get(`${this.path}/:categoryId`, this.getGyId.bind(this));

    this.router.put(
      `${this.path}/:categoryId`,
      validateMiddleware(UpdateCategoryDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.updateByid.bind(this),
    );
  }

  public async create(
    { body }: Request<any, any, CreateCategoryDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Category>> {
    try {
      const category = await this.categoryService.create(body);
      return this.created(res, category);
    } catch (error) {
      next(error);
    }
  }

  public async getAll(
    {
      query: { categoryName, limit, offset, categoryTypeId },
    }: Request<
      any,
      any,
      any,
      LimitOffsetQuery & CategoryNameQuery & CategoryTypeQuery
    >,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Category[]>> {
    try {
      const categories = await this.categoryService.getAll(
        { limit, offset },
        categoryName,
        categoryTypeId,
      );
      return this.ok(res, categories);
    } catch (error) {
      next(error);
    }
  }

  public async getGyId(
    { params: { categoryId } }: Request<CategoryIdParam>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const category = await this.categoryService.getById(categoryId);
      return this.ok(res, category);
    } catch (error) {
      next(error);
    }
  }

  public async updateByid(
    {
      params: { categoryId },
      body,
    }: Request<CategoryIdParam, any, any, UpdateCategoryDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Category>> {
    try {
      const updatedCategory = await this.categoryService.updateById(
        categoryId,
        body,
      );

      return this.ok(res, updatedCategory);
    } catch (error) {
      next(error);
    }
  }
}
