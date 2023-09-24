import { IDatabaseService } from '../database/database.service.interface';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { Category } from './category.entity';
import { ICategoryService } from './category.service.interface';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { CategoryAlreadyExistException } from './exeptions/categoryAlreadyExist.exception';
import { CategoryNotFoundException } from './exeptions/categoryNotFound.exception';

export class CategoryService implements ICategoryService {
  private readonly table: string = 'category';

  constructor(private readonly categoryRepository: IDatabaseService) {}

  public async create(createDto: CreateCategoryDto): Promise<Category> {
    try {
      return this.categoryRepository.insert(this.table, {
        ...createDto,
      } as Category);
    } catch (error) {
      throw new CategoryAlreadyExistException();
    }
  }

  public async getAll(limitOffset?: LimitOffsetQuery): Promise<Category[]> {
    const categories = await this.categoryRepository.selectAll<Category>(
      this.table,
      null,
      null,
      limitOffset,
    );

    if (!categories.length) {
      throw new CategoryNotFoundException();
    }

    return categories;
  }

  public async updateById(
    id: number,
    updateDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.selectOne<Category>(
      this.table,
      { id } as Category,
      { id } as Category,
    );

    if (!category) {
      throw new CategoryNotFoundException(id);
    }

    try {
      return this.categoryRepository.update(
        this.table,
        { ...updateDto, updateDate: new Date() } as Category,
        { id } as Category,
      );
    } catch (error) {
      throw new CategoryAlreadyExistException();
    }
  }
}
