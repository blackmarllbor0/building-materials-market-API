import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../app/base.controller';
import { UserIdParam } from '../user/param/userId.param';
import { IUserService } from '../user/user.service.interface';
import { AuthAudit } from './auth-audit.entity';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { IAuthAuditService } from './auth-audit.service.interface';
import { authMiddleware } from '../middleware/auth.middleware';

export class AuthAuditController extends BaseController {
  constructor(
    private readonly authAuditService: IAuthAuditService,
    private readonly userService: IUserService,
  ) {
    super('/users/:userId/auth-audits');
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get(
      this.path,
      authMiddleware(this.userService),
      this.getAll.bind(this),
    );
  }

  public async getAll(
    {
      query: { limit, offset },
      params: { userId },
    }: Request<UserIdParam, any, any, LimitOffsetQuery>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<AuthAudit[]>> {
    try {
      const audits = await this.authAuditService.getAll(userId, {
        limit,
        offset,
      });
      return this.ok(res, audits);
    } catch (error) {
      next(error);
    }
  }
}
