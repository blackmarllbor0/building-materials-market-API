import { NextFunction, Request, Response } from 'express';
import { BaseController } from 'src/app/base.controller';
import { CategoryNameQuery } from 'src/category/params/categoryName.query';
import { CompanyNameQuery } from 'src/company/params/companyTitle.query';
import { authMiddleware } from 'src/middleware/auth.middleware';
import { validateMiddleware } from 'src/middleware/validate.middleware';
import { LimitOffsetQuery } from 'src/params/LimitOffset.query';
import { UserRoleEnum } from 'src/user-role/userRole.enun';
import { IUserService } from 'src/user/user.service.interface';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductIdParam } from './param/productId.param';
import { ProductNameQuery } from './param/productName.query';
import { Product } from './product.entity';
import { IProductService } from './product.service.interface';

export class ProductController extends BaseController {
  constructor(
    private readonly productService: IProductService,
    private readonly userService: IUserService,
  ) {
    super('/products');
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      this.path,
      validateMiddleware(CreateProductDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.create.bind(this),
    );

    this.router.get(this.path, this.getAll.bind(this));

    this.router.get(`${this.path}/:productId`, this.getById.bind(this));

    this.router.patch(
      `${this.path}/:productId`,
      validateMiddleware(UpdateProductDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.updateById.bind(this),
    );
  }

  public async create(
    { body }: Request<any, any, CreateProductDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Product>> {
    try {
      const product = await this.productService.create(body);
      return this.created(res, product);
    } catch (error) {
      next(error);
    }
  }

  public async getAll(
    {
      query: { categoryName, limit, offset, productName, companyName },
    }: Request<
      any,
      any,
      any,
      LimitOffsetQuery & ProductNameQuery & CategoryNameQuery & CompanyNameQuery
    >,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Product[]>> {
    try {
      const products = await this.productService.getAll(
        {
          limit,
          offset,
        },
        { productName },
        { categoryName },
        { companyName },
      );

      return this.ok(res, products);
    } catch (error) {
      next(error);
    }
  }

  public async getById(
    { params: { productId } }: Request<ProductIdParam>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Product>> {
    try {
      const product = await this.productService.getById(productId);
      return this.ok(res, product);
    } catch (error) {
      next(error);
    }
  }

  public async updateById(
    {
      params: { productId },
      body,
    }: Request<ProductIdParam, any, UpdateProductDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Product>> {
    try {
      const updatedProduct = await this.productService.updateById(
        productId,
        body,
      );
      return this.ok(res, updatedProduct);
    } catch (error) {
      next(error);
    }
  }
}
