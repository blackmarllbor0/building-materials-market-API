import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../app/base.controller';
import { validateMiddleware } from '../middleware/validate.middleware';
import { LogInDto } from './DTO/log-in.dto';
import { IAuthService } from './auth.service.interface';
import { User } from '../user/user.entity';
import { excludeMiddleware } from '../middleware/exclude.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { IUserService } from '../user/user.service.interface';
import { RequestWithUser } from '../user/requestWithUser';

export class AuthController extends BaseController {
  constructor(
    private readonly authService: IAuthService,
    private readonly userService: IUserService,
  ) {
    super('/auth');

    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      `${this.path}/log-in`,
      validateMiddleware(LogInDto),
      excludeMiddleware(User),
      this.logIn.bind(this),
    );

    this.router.get(
      `${this.path}/log-out`,
      authMiddleware(this.userService),
      this.logOut.bind(this),
    );

    this.router.get(
      this.path,
      authMiddleware(this.userService),
      this.auth.bind(this),
    );
  }

  public async logIn(
    { body }: Request<any, any, LogInDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<User>> {
    try {
      const user = await this.authService.logIn(body);

      const cookie = await this.authService.writeTokenToCookie(user.id);
      res.setHeader('Set-Cookie', cookie);

      return this.ok(res, user) as Response<User>;
    } catch (error) {
      next(error);
    }
  }

  public async logOut(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const cookie = this.authService.clearCookieForLogOut();
      res.setHeader('Set-Cookie', cookie);

      return this.ok(res);
    } catch (error) {
      next(error);
    }
  }

  public async auth(
    { user }: RequestWithUser,
    res: Response,
  ): Promise<Response<User>> {
    return this.ok(res, user);
  }
}
