import { UserRole } from './user-role.entity';

export interface IUserRole {
  create(name: string): Promise<UserRole>;

  getAll(): Promise<UserRole[]>;

  updateById(id: number): Promise<UserRole>;
}
