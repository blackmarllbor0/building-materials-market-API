import { OffsetLimit } from '../database/database.service';
import { CategoryType } from './categoryType.entity';
import { CreateCategoryTypeDto } from './dto/createCategoryType.dto';
import { UpdateCategoryTypeDto } from './dto/updateCategoryType.dto';

export interface ICategoryTypeService {
  create(createDto: CreateCategoryTypeDto): Promise<CategoryType>;
  getAll(
    offsetLimit?: OffsetLimit,
    categoryTypeName?: string,
  ): Promise<CategoryType[]>;
  getById(id: number): Promise<CategoryType>;
  updateById(
    id: number,
    updatedDto: UpdateCategoryTypeDto,
  ): Promise<CategoryType>;
}
