import { IDatabaseService } from '../database/database.service.interface';
import { ICategoryTypeService } from './categoryType.interface';
import { OffsetLimit } from '../database/database.service';
import { CategoryType } from './categoryType.entity';
import { UpdateCategoryTypeDto } from './dto/updateCategoryType.dto';
import { CreateCategoryTypeDto } from './dto/createCategoryType.dto';
import { ConflictException } from '../exception/Conflict.exception';
import { BadRequestException } from '../exception/BadRequest.exception';
import { NotFoundException } from '../exception/NotFound.exception';

export class CategoryTypeService implements ICategoryTypeService {
  private readonly table: string = 'category_type';

  constructor(private readonly repository: IDatabaseService) {}

  public async create(createDto: CreateCategoryTypeDto): Promise<CategoryType> {
    const createDtoIsExist = await this.repository.selectOne(this.table, {
      name: createDto.name,
    } as CategoryType);

    if (createDtoIsExist) {
      throw new ConflictException(
        'category type with this name already exists',
      );
    }

    try {
      return this.repository.insert(this.table, {
        ...createDto,
      } as CategoryType);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAll(
    offsetLimit?: OffsetLimit,
    categoryTypeName?: string,
  ): Promise<CategoryType[]> {
    const where = {} as CategoryType;
    if (categoryTypeName) where.name = categoryTypeName;

    const categoryTypes = await this.repository.selectAll(
      this.table,
      where,
      null,
      offsetLimit,
    );

    if (!categoryTypes.length) {
      throw new NotFoundException('category types not found');
    }

    return categoryTypes;
  }
  async getById(id: number): Promise<CategoryType> {
    const categoryType = await this.repository.selectOne(this.table, {
      id,
    } as CategoryType);

    if (!categoryType) {
      throw new NotFoundException(`category type with id - ${id} not found`);
    }

    return categoryType;
  }
  async updateById(
    id: number,
    updatedDto: UpdateCategoryTypeDto,
  ): Promise<CategoryType> {
    const categoryType = await this.repository.selectOne(this.table, {
      id,
    } as CategoryType);

    if (!categoryType) {
      throw new NotFoundException(`category type with id - ${id} not found`);
    }

    const categoryTypeIsExist = await this.repository.selectOne(this.table, {
      name: updatedDto.name,
    } as CategoryType);

    if (categoryTypeIsExist) {
      throw new ConflictException(
        `category type with name - ${updatedDto.name} already exists`,
      );
    }

    try {
      return this.repository.update(
        this.table,
        { ...updatedDto } as CategoryType,
        { id } as CategoryType,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
