import { AuthAudit } from './auth-audit.entity';

export interface IAuthAuditService {
  create(userId: number, authAuditEventId: number): Promise<AuthAudit>;
}
