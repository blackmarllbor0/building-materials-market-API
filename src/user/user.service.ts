import { IUserService } from './user.service.interface';
import { CreateUserDTO } from './DTO/createUser.DTO';
import { User } from './user.entity';

export class UserService implements IUserService {
  public async create(user: CreateUserDTO): User {}

  private async hashPassword(password: string): string {
    const hash = bcrypt.hash;
  }
}
