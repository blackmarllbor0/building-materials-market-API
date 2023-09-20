import { IDatabaseService } from '../database/database.service.interface';
import { Session } from './session.entity';
import * as moment from 'moment';
import { IConfigService } from '../config/config.interface';
import * as bcrypt from 'bcrypt';
import { ISessionService } from './session.service.interface';

export class SessionService implements ISessionService {
  private readonly table = 'session';

  constructor(
    private readonly configService: IConfigService,
    private readonly sessionRepository: IDatabaseService,
  ) {}

  public async create(userId: number): Promise<Session> {
    const token = await this.generateToken(userId);
    return this.sessionRepository.insert<Session>(this.table, {
      userId,
      token,
      liveTime: this.createTokenLiveTime(),
    } as Session);
  }

  private createTokenLiveTime(): Date {
    return moment(new Date())
      .add(this.configService.number('TOKEN_LIVE_TIME_IN_HOURS'), 'hours')
      .locale('kz')
      .toDate();
  }

  private async generateToken(userId: number): Promise<string> {
    const token = Math.random().toString(3).substring(0) + `_id:${userId}`;

    return bcrypt.hash(token, this.configService.number('TOKEN_SALT'));
  }
}
