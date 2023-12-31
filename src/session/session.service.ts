import { IDatabaseService } from '../database/database.service.interface';
import { Session } from './session.entity';
import * as moment from 'moment';
import { IConfigService } from '../config/config.interface';
import { ISessionService } from './session.service.interface';
import * as jwt from 'jsonwebtoken';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { SessionNotFoundException } from './exceptions/SessionNotFound.exception';

export class SessionService implements ISessionService {
  private readonly table = 'session';

  constructor(
    private readonly configService: IConfigService,
    private readonly sessionRepository: IDatabaseService,
  ) {}

  public async create(userId: number): Promise<Session> {
    const token = await this.generateToken(userId);
    const liveTime = this.createTokenLiveTime();
    return this.sessionRepository.insert<Session>(this.table, {
      userId,
      token,
      liveTime,
    } as Session);
  }

  private createTokenLiveTime(): Date {
    return moment(new Date())
      .add(this.configService.number('TOKEN_LIVE_TIME_IN_HOURS'), 'hours')
      .locale('kz')
      .toDate();
  }

  private async generateToken(userId: number): Promise<string> {
    return jwt.sign({ userId }, this.configService.string('TOKEN_SECRET'), {
      expiresIn:
        this.configService.number('TOKEN_LIVE_TIME_IN_HOURS') * 60 * 60 + 's',
    });
  }

  public async getAll(
    userId?: number,
    limitOffset?: LimitOffsetQuery,
  ): Promise<Session[]> {
    const where = {} as Session;
    if (userId) where.userId = userId;

    const sessions = await this.sessionRepository.selectAll(
      this.table,
      where,
      null,
      limitOffset,
    );

    if (!sessions.length) throw new SessionNotFoundException();

    return sessions;
  }

  async getById(id: number): Promise<Session> {
    const session = await this.sessionRepository.selectOne(this.table, {
      id,
    } as Session);

    if (!session) throw new SessionNotFoundException(id);

    return session;
  }
}
