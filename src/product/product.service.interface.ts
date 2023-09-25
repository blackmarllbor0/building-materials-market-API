import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductNameQuery } from './param/productName.query';
import { Product } from './product.entity';
import { CategoryIdParam } from '../category/params/categoryId.param';
import { CompanyIdParam } from '../company/params/companyId.param';

export interface IProductService {
  create(createDto: CreateProductDto): Promise<Product>;
  getAll(
    limitOffset?: LimitOffsetQuery,
    productName?: ProductNameQuery,
    categoryId?: CategoryIdParam,
    companyId?: CompanyIdParam,
  ): Promise<Product[]>;
  getById(id: number): Promise<Product>;
  updateById(id: number, updateDto: UpdateProductDto): Promise<Product>;
}
