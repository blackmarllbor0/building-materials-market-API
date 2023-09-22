import { IUserService } from '../user/user.service.interface';
import { IAuthService } from './auth.service.interface';
import { User } from '../user/user.entity';
import { LogInDto } from './DTO/log-in.dto';
import * as bcrypt from 'bcrypt';
import { WrongCredentialsException } from './exceptions/WrongCredentials.exception';
import { ISessionService } from '../session/session.service.interface';
import { IAuthAuditService } from '../auth-audit/auth-audit.service.interface';
import { AuthAuditEventEnum } from '../auth-audit-event/auth-audit-event.enum';

export class AuthService implements IAuthService {
  constructor(
    private readonly userService: IUserService,
    private readonly sessionService: ISessionService,
    private readonly authAuditService: IAuthAuditService,
  ) {}

  public async logIn({
    email,
    phoneNumber,
    password,
  }: LogInDto): Promise<User> {
    if (!email && !phoneNumber) {
      throw new WrongCredentialsException();
    }

    let user: User;

    if (email) {
      user = await this.userService.getByEmail(email || phoneNumber);
    } else {
      user = await this.userService.getByPhoneNumber(email || phoneNumber);
    }

    if (user) {
      if (await this.comparePassword(password, user.passwordHash)) {
        await this.authAuditService.create(
          user.id,
          AuthAuditEventEnum.successfulLogin,
        );
        return user;
      } else {
        await this.authAuditService.create(
          user.id,
          AuthAuditEventEnum.failedPassword,
        );

        throw new WrongCredentialsException();
      }
    } else {
      throw new WrongCredentialsException();
    }
  }

  private async comparePassword(
    pwd: string,
    hashPwd: string,
  ): Promise<boolean> {
    return bcrypt.compare(pwd, hashPwd);
  }

  public async writeTokenToCookie(userId: number): Promise<string> {
    const { token, liveTime } = await this.sessionService.create(userId);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${liveTime.getHours()}`;
  }
}
