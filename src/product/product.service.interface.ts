import { CategoryNameQuery } from 'src/category/params/categoryName.query';
import { CompanyNameQuery } from 'src/company/params/companyTitle.query';
import { LimitOffsetQuery } from 'src/params/LimitOffset.query';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductNameQuery } from './param/productName.query';
import { Product } from './product.entity';

export interface IProductService {
  create(createDto: CreateProductDto): Promise<Product>;
  getAll(
    limitOffset?: LimitOffsetQuery,
    productName?: ProductNameQuery,
    categoryName?: CategoryNameQuery,
    comapnyName?: CompanyNameQuery,
  ): Promise<Product[]>;
  getById(id: number): Promise<Product>;
  updateById(id: number, updateDto: UpdateProductDto): Promise<Product>;
}
