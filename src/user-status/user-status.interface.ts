import { LimitOffsetQuery } from 'src/params/LimitOffset.query';
import { CreateUserStatusDto } from './dto/createUserStatus.dto';
import { UpdateUserStatusDto } from './dto/updateUserStatus.dto';
import { UserStatus } from './user-role.entity';

export interface IUserStatusService {
  create(createDto: CreateUserStatusDto): Promise<UserStatus>;
  getAll(limitOffset?: LimitOffsetQuery): Promise<UserStatus[]>;
  updateById(id: number, updateDto: UpdateUserStatusDto): Promise<UserStatus>;
}
