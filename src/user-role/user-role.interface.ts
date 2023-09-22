import { LimitOffsetQuery } from 'src/params/LimitOffset.query';
import { CreateUserRoleDto } from './DTO/createUserRole.dto';
import { UpdateUserRoleDto } from './DTO/updateUserRole.dto';
import { UserRole } from './user-role.entity';

export interface IUserRole {
  create(dto: CreateUserRoleDto): Promise<UserRole>;

  getAll(limitOffset?: LimitOffsetQuery): Promise<UserRole[]>;

  updateById(id: number, dto: UpdateUserRoleDto): Promise<UserRole>;
}
