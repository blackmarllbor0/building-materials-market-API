import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

export interface ICategoryService {
  create(createDto: CreateCategoryDto): Promise<Category>;
  getAll(limitOffset?: LimitOffsetQuery): Promise<Category[]>;
  updateById(id: number, updateDto: UpdateCategoryDto): Promise<Category>;
}
