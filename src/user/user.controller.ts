import { Request, Response } from 'express';
import { IUserService } from './user.service.interface';
import { BaseController } from '../app/base.controller';
import { validateMiddleware } from '../middleware/validate.middleware';
import { CreateUserDTO } from './DTO/createUser.DTO';
import { User } from './user.entity';
import { excludeMiddleware } from '../middleware/exclude.middleware';

export class UserController extends BaseController {
  constructor(private readonly userService: IUserService) {
    super('/users');
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
  ): Promise<Response<User>> {
    const user = await this.userService.create(body);
    return this.created(res, user);
  }
}
