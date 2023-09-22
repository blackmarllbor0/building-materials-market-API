import { Session } from './session.entity';

export interface ISessionService {
  create(userId: number): Promise<Session>;
}
