import { User } from './user.entity';
import { CreateUserDTO } from './DTO/createUser.DTO';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { UpdateUserDto } from './DTO/updateUser.dto';

export interface IUserService {
  create(user: CreateUserDTO): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getByPhoneNumber(phoneNumber: string): Promise<User>;
  getById(id: number): Promise<User>;
  getAll(LimitOffset?: LimitOffsetQuery): Promise<User[]>;
  updateById(id: number, updateDto: UpdateUserDto): Promise<User>;
  deleteById(id: number): Promise<void>;
}
