import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { AuthAudit } from './auth-audit.entity';

export interface IAuthAuditService {
  create(userId: number, authAuditEventId: number): Promise<AuthAudit>;
  getAll(userId: number, limitOffset?: LimitOffsetQuery): Promise<AuthAudit[]>;
}
