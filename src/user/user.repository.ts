import { IDatabaseService } from '../database/database.service.interface';
import { IUserRepository } from './user.repository.interface';
import { User } from './user.entity';
import { CreateUserDTO } from './DTO/createUser.DTO';

export class UserRepository implements IUserRepository {
  private readonly table: string;

  constructor(private readonly dbService: IDatabaseService) {
    this.table = 'user';
  }

  public async insertUser({
    userRoleId,
    name,
    email,
    phoneNumber,
    passwordHash,
  }: CreateUserDTO): Promise<User> {
    const { outBinds } = await this.dbService.insert<User>(
      this.table,
      [
        'user_role_id',
        'user_status_id',
        'name',
        'email',
        'phone_number',
        'password_hash',
        'is_blocked',
        'is_deleted',
      ],
      [userRoleId, 1, name, email, phoneNumber, passwordHash, false, false],
    );

    return outBinds;
  }
}
