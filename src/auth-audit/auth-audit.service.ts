import { IDatabaseService } from '../database/database.service.interface';
import { AuthAudit } from './auth-audit.entity';
import { IAuthAuditService } from './auth-audit.service.interface';

export class AuthAuditService implements IAuthAuditService {
  private readonly table = 'auth_audit';
  constructor(private readonly authAuditRepository: IDatabaseService) {}

  public async create(
    userId: number,
    authAuditEventId: number,
  ): Promise<AuthAudit> {
    return this.authAuditRepository.insert<AuthAudit>(this.table, {
      userId,
      authAuditEventId,
    } as AuthAudit);
  }
}
