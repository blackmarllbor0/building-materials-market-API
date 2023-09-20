import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../app/base.controller';
import { validateMiddleware } from '../middleware/validate.middleware';
import { LogInDto } from './DTO/log-in.dto';
import { IAuthService } from './auth.service.interface';
import { User } from '../user/user.entity';
import { excludeMiddleware } from '../middleware/eclude.middleware';

export class AuthController extends BaseController {
  constructor(private readonly authService: IAuthService) {
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
}
