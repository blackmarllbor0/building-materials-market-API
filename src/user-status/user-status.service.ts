import { IDatabaseService } from '../database/database.service.interface';
import { IUserStatusService } from './user-status.interface';
import { CreateUserStatusDto } from './dto/createUserStatus.dto';
import { UserStatus } from './user-role.entity';
import { UpdateUserStatusDto } from './dto/updateUserStatus.dto';
import * as status from 'http-status';
import { UserStatusAlreadyExists } from './exceptions/userStatusAlreadyExists.exception';
import { UserStatusNotFound } from './exceptions/userStatusNotFound.exception';
import { BadRequestException } from '../exception/BadRequest.exception';
import { LimitOffsetQuery } from '../params/LimitOffset.query';

export class UserStatusService implements IUserStatusService {
  private readonly table: string = 'user_status';
  constructor(private readonly userStatusRepository: IDatabaseService) {}

  public async create(createDto: CreateUserStatusDto): Promise<UserStatus> {
    try {
      return this.userStatusRepository.insert(
        this.table,
        createDto as UserStatus,
      );
    } catch (error) {
      if (error?.status === status.CONFLICT) {
        throw new UserStatusAlreadyExists();
      }
    }
  }

  public async getAll(limitOffset?: LimitOffsetQuery): Promise<UserStatus[]> {
    const userStatuses = await this.userStatusRepository.selectAll<UserStatus>(
      this.table,
      null,
      null,
      limitOffset,
    );

    if (!userStatuses.length) {
      throw new UserStatusNotFound();
    }

    return userStatuses;
  }

  public async updateById(
    id: number,
    updateDto: UpdateUserStatusDto,
  ): Promise<UserStatus> {
    const userStatus = await this.userStatusRepository.selectOne(this.table, {
      id,
    } as UserStatus);

    if (!userStatus) {
      throw new UserStatusNotFound(id);
    }

    try {
      return this.userStatusRepository.update(
        this.table,
        {
          ...updateDto,
          updateDate: new Date(),
        } as unknown as UserStatus,
        { id } as UserStatus,
      );
    } catch (error) {
      if (error?.status == status.CONFLICT) {
        throw new UserStatusAlreadyExists();
      }

      throw new BadRequestException(error.message);
    }
  }
}
