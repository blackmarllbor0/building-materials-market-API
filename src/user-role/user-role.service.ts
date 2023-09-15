import { IUserRole } from './user-role.interface';
import { UserRole } from './user-role.entity';

export class UserRoleService implements IUserRole {
  create = (name: string): UserRole => new UserRole();

  getAll = (): UserRole[] => [new UserRole()];

  updateById = (id: number): UserRole => new UserRole();
}
