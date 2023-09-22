import { IUserRole } from './user-role.interface';
import { UserRole } from './user-role.entity';
import { IDatabaseService } from '../database/database.service.interface';
import status from 'http-status';
import { UpdateUserRoleDto } from './DTO/updateUserRole.dto';
import { CreateUserRoleDto } from './DTO/createUserRole.dto';
import { UserRoleWithThisNameAlreadyExist } from './exceptions/userRoleAlreadyExist.exception';
import { BadRequestException } from '../exception/BadRequest.exception';
import { UserRoleNotFound } from './exceptions/userRoleNotFound.exception';
import { LimitOffsetQuery } from 'src/params/LimitOffset.query';

export class UserRoleService implements IUserRole {
  private readonly table = 'user_role';
  constructor(private readonly userRoleRepository: IDatabaseService) {}

  public async create(dto: CreateUserRoleDto): Promise<UserRole> {
    try {
      return this.userRoleRepository.insert<UserRole>(
        this.table,
        dto as UserRole,
      );
    } catch (error) {
      if (error?.status == status.CONFLICT) {
        throw new UserRoleWithThisNameAlreadyExist();
      }

      throw new BadRequestException(error.message);
    }
  }

  public async getAll(limitOffset?: LimitOffsetQuery): Promise<UserRole[]> {
    const userRoles = await this.userRoleRepository.selectAll<UserRole>(
      this.table,
      null,
      null,
      limitOffset,
    );
    if (!userRoles.length) {
      throw new UserRoleNotFound();
    }

    return userRoles;
  }

  public async updateById(
    id: number,
    dto: UpdateUserRoleDto,
  ): Promise<UserRole> {
    const userRole = await this.userRoleRepository.selectOne(this.table, {
      id,
    } as UserRole);

    if (!userRole) {
      throw new UserRoleNotFound(id);
    }

    try {
      return this.userRoleRepository.update<UserRole>(
        this.table,
        { ...dto, updateDate: new Date() } as UserRole,
        {
          id,
        } as UserRole,
      );
    } catch (error) {
      if (error?.status == status.CONFLICT) {
        throw new UserRoleWithThisNameAlreadyExist();
      }

      throw new BadRequestException(error.message);
    }
  }
}
