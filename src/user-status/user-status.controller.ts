import { NextFunction, Request, Response } from 'express';
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
import { LimitOffsetQuery } from '../params/LimitOffset.query';

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
      authMiddleware(this.userService),
      this.getAll.bind(this),
    );

    this.router.get(
      `${this.path}/:userStatusId`,
      authMiddleware(this.userService),
      this.getById.bind(this),
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
    next: NextFunction,
  ): Promise<Response<UserStatus>> {
    try {
      const userStatus = await this.userStatusService.create(body);
      return this.created(res, userStatus);
    } catch (error) {
      next(error);
    }
  }

  public async getAll(
    { query }: Request<any, any, any, LimitOffsetQuery>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<UserStatus[]>> {
    try {
      const userStatuses = await this.userStatusService.getAll(query);
      return this.ok(res, userStatuses);
    } catch (error) {
      next(error);
    }
  }

  public async getById(
    { params: { userStatusId } }: Request<{ userStatusId: number }>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<UserStatus>> {
    try {
      const userStatus = await this.userStatusService.getById(userStatusId);
      return this.ok(res, userStatus);
    } catch (error) {
      next(error);
    }
  }

  public async updateById(
    {
      body,
      params: { userStatusId },
    }: Request<UserStatusIdParam, any, UpdateUserStatusDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<UserStatus>> {
    try {
      const updatedUserStatus = await this.userStatusService.updateById(
        userStatusId,
        body,
      );
      return this.ok(res, updatedUserStatus);
    } catch (error) {
      next(error);
    }
  }
}
