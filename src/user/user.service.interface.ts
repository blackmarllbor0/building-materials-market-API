import { User } from './user.entity';
import { CreateUserDTO } from './DTO/createUser.DTO';

export interface IUserService {
  create(user: CreateUserDTO): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getByPhoneNumber(phoneNumber: string): Promise<User>;
}
