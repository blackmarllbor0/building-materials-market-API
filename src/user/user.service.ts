import { IUserService } from './user.service.interface';
import { CreateUserDTO } from './DTO/createUser.DTO';
import { User } from './user.entity';
import { IDatabaseService } from '../database/database.service.interface';
import { UserAlreadyExistsException } from './exception/UserAlreadyExist.exception';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { UpdateUserDto } from './DTO/updateUser.dto';
import { UserNotFoundException } from './exception/userNotFound.exception';
import * as bcrypt from 'bcrypt';
import { CONFLICT } from 'http-status';
import { BadRequestException } from '../exception/BadRequest.exception';
import { NotFoundException } from '../exception/NotFound.exception';
import { WrongCredentialsException } from '../auth/exceptions/WrongCredentials.exception';

export class UserService implements IUserService {
  private readonly table = 'user';
  constructor(private readonly userRepository: IDatabaseService) {}
  public async create(user: CreateUserDTO): Promise<User> {
    const isUserAlreadyExist = await this.userRepository.selectOne(
      this.table,
      {
        email: user.email,
        phoneNumber: user.phoneNumber,
        isDeleted: 0,
      } as User,
      { id: 0 } as User,
    );

    if (isUserAlreadyExist) {
      throw new UserAlreadyExistsException();
    }

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
      throw new BadRequestException(error.message);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.selectOne<User>(this.table, {
      email,
      isDeleted: 0,
    } as User);

    if (!user) {
      throw new NotFoundException(`user with this email - ${email} not found`);
    }

    return user;
  }

  public async getByPhoneNumber(phoneNumber: string): Promise<User> {
    const user = this.userRepository.selectOne<User>(this.table, {
      phoneNumber,
      isDeleted: 0,
    } as User);

    if (!user) {
      throw new NotFoundException(
        `user with this phone number - ${phoneNumber} not found`,
      );
    }

    return user;
  }

  public async getById(id: number): Promise<User> {
    const user = await this.userRepository.selectOne<User>(this.table, {
      id,
      isDeleted: 0,
    } as User);

    if (!user) {
      throw new UserNotFoundException(id);
    }

    return user;
  }

  public async getAll(LimitOffset?: LimitOffsetQuery): Promise<User[]> {
    const users = await this.userRepository.selectAll<User>(
      this.table,
      { isDeleted: 0 } as User,
      null,
      LimitOffset,
    );

    if (!users.length) {
      throw new UserNotFoundException();
    }

    return users;
  }

  public async updateById(id: number, updateDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.selectOne<User>(this.table, {
      id,
      isDeleted: 0,
    } as User);

    if (!user) {
      throw new UserNotFoundException();
    }

    try {
      if (!(await bcrypt.compare(updateDto.oldPassword, user.passwordHash))) {
        throw new WrongCredentialsException();
      }

      const passwordHash = updateDto.password
        ? await this.hashPassword(updateDto.password)
        : null;

      delete updateDto.password;
      delete updateDto.oldPassword;

      return this.userRepository.update(
        this.table,
        {
          ...updateDto,
          updateDate: new Date(),
          passwordHash,
        } as unknown as User,
        { id } as User,
      );
    } catch (error) {
      if (error?.status === CONFLICT) {
        throw new UserAlreadyExistsException();
      }

      throw new BadRequestException(error?.message);
    }
  }

  async deleteById(id: number): Promise<void> {
    const user = await this.userRepository.selectOne<User>(
      this.table,
      { id, isDeleted: 0 } as User,
      { id } as User,
    );

    if (!user) {
      throw new UserNotFoundException();
    }

    try {
      await this.userRepository.update(
        this.table,
        { isDeleted: 1 } as User,
        {
          id,
        } as User,
      );
    } catch (error) {
      if (error?.status === CONFLICT) {
        throw new UserAlreadyExistsException();
      }

      throw new BadRequestException(error?.message);
    }
  }
}
