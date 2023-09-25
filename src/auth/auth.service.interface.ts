import { User } from '../user/user.entity';
import { LogInDto } from './DTO/log-in.dto';

export interface IAuthService {
  logIn(dto: LogInDto): Promise<User>;
  writeTokenToCookie(userId: number): Promise<string>;
  clearCookieForLogOut(): string;
}
