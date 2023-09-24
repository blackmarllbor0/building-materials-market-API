import { CategoryNameQuery } from 'src/category/params/categoryName.query';
import { CompanyNameQuery } from 'src/company/params/companyTitle.query';
import { IDatabaseService } from 'src/database/database.service.interface';
import { LimitOffsetQuery } from 'src/params/LimitOffset.query';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductAlreadyExitsException } from './eceptions/productAlreaadyExists.exception';
import { ProductNameQuery } from './param/productName.query';
import { Product } from './product.entity';
import { IProductService } from './product.service.interface';

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
    categoryName?: CategoryNameQuery,
    comapnyName?: CompanyNameQuery,
  ): Promise<Product[]> {
    const products = await this.productRepository.selectAll<Product>(
      this.table,
      {} as Product,
    );
  }
}
