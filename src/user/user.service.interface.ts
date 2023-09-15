import { User } from './user.entity';
import { CreateUserDTO } from './DTO/createUser.DTO';

export interface IUserService {
  create(user: CreateUserDTO): User;
}
