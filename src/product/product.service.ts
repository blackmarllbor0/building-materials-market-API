import { IDatabaseService } from '../database/database.service.interface';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductAlreadyExitsException } from './eceptions/productAlreaadyExists.exception';
import { ProductNameQuery } from './param/productName.query';
import { Product } from './product.entity';
import { IProductService } from './product.service.interface';
import { ProductNotFoundException } from './eceptions/productNotFound.exception';
import { CategoryIdParam } from '../category/params/categoryId.param';
import { CompanyIdParam } from '../company/params/companyId.param';
import { UpdateProductDto } from './dto/updateProduct.dto';

export class ProductService implements IProductService {
  private readonly table: string = 'product';

  constructor(private readonly productRepository: IDatabaseService) {}

  public async create(createDto: CreateProductDto): Promise<Product> {
    try {
      return this.productRepository.insert<Product>(this.table, {
        ...createDto,
      } as unknown as Product);
    } catch (error) {
      throw new ProductAlreadyExitsException();
    }
  }

  public async getAll(
    limitOffset?: LimitOffsetQuery,
    productName?: ProductNameQuery,
    categoryId?: CategoryIdParam,
    companyId?: CompanyIdParam,
  ): Promise<Product[]> {
    const where = {} as Product;
    if (productName && productName.productName) {
      where.title = productName.productName;
    }

    if (categoryId && categoryId.categoryId) {
      where.categoryId = categoryId.categoryId;
    }

    if (companyId && companyId.companyId) {
      where.companyId = companyId.companyId;
    }

    const products = await this.productRepository.selectAll<Product>(
      this.table,
      Object.keys(where).length ? where : null,
      null,
      limitOffset,
    );

    if (!products.length) {
      throw new ProductNotFoundException();
    }

    return products;
  }

  public async getById(id: number): Promise<Product> {
    const product = await this.productRepository.selectOne<Product>(
      this.table,
      { id } as Product,
    );

    if (!product) throw new ProductNotFoundException(id);

    return product;
  }

  async updateById(id: number, updateDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.selectOne<Product>(
      this.table,
      { id } as Product,
      { id } as Product,
    );

    if (!product) throw new ProductNotFoundException(id);

    try {
      return this.productRepository.update(
        this.table,
        { ...updateDto, updateDate: new Date() } as unknown as Product,
        { id } as Product,
      );
    } catch (error) {
      throw new ProductAlreadyExitsException();
    }
  }
}
