import { User } from './user.entity';

export interface IUserRepository {
  insertUser(user: User): Promise<User>;
}
