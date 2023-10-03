import { NextFunction, Request, Response } from 'express';
import { IUserService } from './user.service.interface';
import { BaseController } from '../app/base.controller';
import { validateMiddleware } from '../middleware/validate.middleware';
import { CreateUserDTO } from './DTO/createUser.DTO';
import { User } from './user.entity';
import { excludeMiddleware } from '../middleware/exclude.middleware';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { authMiddleware } from '../middleware/auth.middleware';
import { UserIdParam } from './param/userId.param';
import { UpdateUserDto } from './DTO/updateUser.dto';

export class UserController extends BaseController {
  constructor(private readonly userService: IUserService) {
    super('/users');
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      this.path,
      validateMiddleware(CreateUserDTO),
      excludeMiddleware(User),
      this.create.bind(this),
    );

    this.router.get(
      this.path,
      authMiddleware(this.userService),
      this.getAll.bind(this),
    );

    this.router.get(
      `${this.path}/:userId`,
      authMiddleware(this.userService),
      this.getById.bind(this),
    );

    this.router.patch(
      `${this.path}/:userId`,
      validateMiddleware(UpdateUserDto),
      authMiddleware(this.userService),
      this.updateById.bind(this),
    );

    this.router.delete(
      `${this.path}/:userId`,
      authMiddleware(this.userService),
      this.deleteById.bind(this),
    );
  }

  public async create(
    { body }: Request<any, any, CreateUserDTO>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<User>> {
    try {
      const user = await this.userService.create(body);
      return this.created(res, user);
    } catch (error) {
      next(error);
    }
  }

  public async getAll(
    { query }: Request<any, any, any, LimitOffsetQuery>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<User[]>> {
    try {
      const users = await this.userService.getAll(query);
      return this.ok(res, users);
    } catch (error) {
      next(error);
    }
  }

  public async getById(
    { params: { userId } }: Request<UserIdParam>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const user = await this.userService.getById(userId);
      return this.ok(res, user);
    } catch (error) {
      next(error);
    }
  }

  public async updateById(
    { body, params: { userId } }: Request<UserIdParam, any, UpdateUserDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<User>> {
    try {
      const updatedUser = await this.userService.updateById(userId, body);
      return this.ok(res, updatedUser);
    } catch (error) {
      next(error);
    }
  }

  public async deleteById(
    { params: { userId } }: Request<UserIdParam>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await this.userService.deleteById(userId);
      return this.ok(res);
    } catch (error) {
      next(error);
    }
  }
}
