import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { Session } from './session.entity';

export interface ISessionService {
  create(userId: number): Promise<Session>;
  getAll(userId?: number, limitOffset?: LimitOffsetQuery): Promise<Session[]>;
  getById(id: number): Promise<Session>;
}
