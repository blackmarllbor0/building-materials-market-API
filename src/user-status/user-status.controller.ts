import { Request, Response } from 'express';
import { BaseController } from '../app/base.controller';
import { CreateUserStatusDto } from './dto/createUserStatus.dto';
import { validateMiddleware } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { IUserStatusService } from './user-status.interface';
import { IUserService } from '../user/user.service.interface';
import { UserStatusIdParam } from './params/user-status.param';
import { UpdateUserStatusDto } from './dto/updateUserStatus.dto';
import { UserStatus } from './user-role.entity';
import { UserRoleEnum } from '../user-role/userRole.enun';

export class UserStatusController extends BaseController {
  constructor(
    private readonly userStatusService: IUserStatusService,
    private readonly userService: IUserService,
  ) {
    super('/user-statuses');
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      this.path,
      validateMiddleware(CreateUserStatusDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.create.bind(this),
    );

    this.router.get(
      this.path,
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.getAll.bind(this),
    );

    this.router.put(
      `${this.path}/:userStatusId`,
      validateMiddleware(UpdateUserStatusDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.updateById.bind(this),
    );
  }

  public async create(
    { body }: Request<any, any, CreateUserStatusDto>,
    res: Response,
  ): Promise<Response<UserStatus>> {
    const userStatus = await this.userStatusService.create(body);
    return this.created(res, userStatus);
  }

  public async getAll(
    req: Request,
    res: Response,
  ): Promise<Response<UserStatus[]>> {
    const userStatuses = await this.userStatusService.getAll();
    return this.ok(res, userStatuses);
  }

  public async updateById(
    {
      body,
      params: { userStatusId },
    }: Request<UserStatusIdParam, any, UpdateUserStatusDto>,
    res: Response,
  ): Promise<Response<UserStatus>> {
    const updatedUserStatus = await this.userStatusService.updateById(
      userStatusId,
      body,
    );
    return this.ok(res, updatedUserStatus);
  }
}
