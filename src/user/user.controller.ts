import { NextFunction, Request, Response } from 'express';
import { IUserService } from './user.service.interface';
import { BaseController } from '../app/base.controller';
import { validateMiddleware } from '../middleware/validate.middleware';
import { CreateUserDTO } from './DTO/createUser.DTO';
import { User } from './user.entity';
import { excludeMiddleware } from '../middleware/exclude.middleware';

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
}
