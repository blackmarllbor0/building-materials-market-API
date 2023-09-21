import { IUserService } from './user.service.interface';
import { CreateUserDTO } from './DTO/createUser.DTO';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { IDatabaseService } from '../database/database.service.interface';
import { UserAlreadyExistsException } from './exception/UserAlreadyExist.exception';

export class UserService implements IUserService {
  private readonly table = 'user';
  constructor(private readonly userRepository: IDatabaseService) {}

  public async create(user: CreateUserDTO): Promise<User> {
    try {
      const passwordHash = await this.hashPassword(user.password);
      delete user['password'];
      return this.userRepository.insert<User>(this.table, {
        ...user,
        userRoleId: 1,
        userStatusId: 1,
        passwordHash,
      } as unknown as User);
    } catch (error) {
      throw new UserAlreadyExistsException();
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public async getByEmail(email: string): Promise<User> {
    return this.userRepository.selectOne<User>(this.table, { email } as User);
  }

  public async getByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.userRepository.selectOne<User>(this.table, {
      phoneNumber,
    } as User);
  }

  public async getById(id: number): Promise<User> {
    return this.userRepository.selectOne<User>(this.table, { id } as User);
  }
}
