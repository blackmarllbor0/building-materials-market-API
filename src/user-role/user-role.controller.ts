import { Request, Response } from 'express';
import { IUserRole } from './user-role.interface';
import { BaseController } from '../app/base.controller';
import { CreateUserRoleDto } from './DTO/createUserRole.dto';
import { authMiddleware } from '../middleware/auth.middleware';
import { IUserService } from '../user/user.service.interface';
import { UserRoleEnum } from './userRole.enun';

export class UserRoleController extends BaseController {
  constructor(
    private readonly userRoleService: IUserRole,
    private readonly userService: IUserService,
  ) {
    super('/user-roles');

    this.initRoutes();
  }

  public initRoutes(): void {
    if (!this.userService) return;

    this.router.post(
      this.path,
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.create,
    );
  }

  public create(
    { body: { name } }: Request<any, any, CreateUserRoleDto>,
    res: Response,
  ): void {
    // const post = this.userRoleService.create(name);
    res.send(name);
  }
}
