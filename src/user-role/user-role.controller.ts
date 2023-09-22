import { Request, Response } from 'express';
import { IUserRole } from './user-role.interface';
import { BaseController } from '../app/base.controller';
import { CreateUserRoleDto } from './DTO/createUserRole.dto';
import { authMiddleware } from '../middleware/auth.middleware';
import { IUserService } from '../user/user.service.interface';
import { UserRoleEnum } from './userRole.enun';
import { UserRole } from './user-role.entity';
import { validateMiddleware } from '../middleware/validate.middleware';
import { UpdateUserRoleDto } from './DTO/updateUserRole.dto';
import { UserRoleIdParam } from './params/userRole.param';

export class UserRoleController extends BaseController {
  constructor(
    private readonly userRoleService: IUserRole,
    private readonly userService: IUserService,
  ) {
    super('/user-roles');

    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      this.path,
      validateMiddleware(CreateUserRoleDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.create.bind(this),
    );

    this.router.get(
      this.path,
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.getAll.bind(this),
    );

    this.router.put(
      `${this.path}/:userRoleId`,
      validateMiddleware(UpdateUserRoleDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.updateById.bind(this),
    );
  }

  public async create(
    { body }: Request<any, any, CreateUserRoleDto>,
    res: Response,
  ): Promise<void> {
    const userRole = await this.userRoleService.create(body);
    this.created(res, userRole);
  }

  public async getAll(
    _req: Request,
    res: Response,
  ): Promise<Response<UserRole[]>> {
    const userRoles = await this.userRoleService.getAll();
    return this.ok(res, userRoles);
  }

  public async updateById(
    {
      body,
      params: { userRoleId },
    }: Request<UserRoleIdParam, any, UpdateUserRoleDto>,
    res: Response,
  ): Promise<Response<UserRole>> {
    const updatedRole = await this.userRoleService.updateById(userRoleId, body);
    return this.ok(res, updatedRole);
  }
}
