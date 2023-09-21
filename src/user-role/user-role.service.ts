import { IUserRole } from './user-role.interface';
import { UserRole } from './user-role.entity';
import { IDatabaseService } from '../database/database.service.interface';
import { HttpException } from '../exception/HttpException';
import status from 'http-status';

export class UserRoleService implements IUserRole {
  private readonly table = 'user_role';
  constructor(private readonly userRoleRepository: IDatabaseService) {}

  public async create(name: string): Promise<UserRole> {
    try {
      return this.userRoleRepository.insert<UserRole>(this.table, {
        name,
      } as UserRole);
    } catch (error) {
      throw new HttpException(
        status.CONFLICT,
        'user role with this name already exist',
      );
    }
  }

  public async getAll(): Promise<UserRole[]> {
    return this.userRoleRepository.selectAll<UserRole>(this.table);
  }

  public async updateById(id: number): Promise<UserRole> {
    return this.userRoleRepository.selectOne<UserRole>(this.table, {
      id,
    } as UserRole);
  }
}
