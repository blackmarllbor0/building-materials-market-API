import { UserRole } from './user-role.entity';

export interface IUserRole {
  create(name: string): UserRole;
}
