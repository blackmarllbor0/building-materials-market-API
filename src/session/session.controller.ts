import { BaseController } from '../app/base.controller';
import { ISessionService } from './session.service.interface';
import { IUserService } from '../user/user.service.interface';
import { NextFunction, Request, Response } from 'express';
import { Session } from './session.entity';
import { authMiddleware } from '../middleware/auth.middleware';
import { User } from '../user/user.entity';
import { UserIdParam } from '../user/param/userId.param';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { UserRoleEnum } from '../user-role/userRole.enun';
import { SessionIdParam } from './params/sessionId.param';
import { excludeMiddleware } from '../middleware/exclude.middleware';

export class SessionController extends BaseController {
  constructor(
    private readonly sessionService: ISessionService,
    private readonly userService: IUserService,
  ) {
    super('/sessions');
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get(
      this.path,
      excludeMiddleware(Session),
      authMiddleware(this.userService),
      this.getAll.bind(this),
    );

    this.router.get(
      `${this.path}/:sessionId`,
      excludeMiddleware(Session),
      authMiddleware(this.userService),
      this.getById.bind(this),
    );
  }

  public async getAll(
    {
      query: { limit, offset, userId },
    }: Request<any, any, any, UserIdParam & LimitOffsetQuery>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Session[]>> {
    try {
      const user = res.req['user'] as User;
      if (user.userRoleId === UserRoleEnum.admin && !userId) {
        const sessions = await this.sessionService.getAll(null, {
          limit,
          offset,
        });
        return this.ok(res, sessions);
      }

      const sessions = await this.sessionService.getAll(userId, {
        limit,
        offset,
      });

      return this.ok(res, sessions);
    } catch (error) {
      next(error);
    }
  }

  public async getById(
    { params: { sessionId } }: Request<SessionIdParam>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Session>> {
    try {
      const session = await this.sessionService.getById(sessionId);
      return this.ok(res, session);
    } catch (error) {
      next(error);
    }
  }
}
