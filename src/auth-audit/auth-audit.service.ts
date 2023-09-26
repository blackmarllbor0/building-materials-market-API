import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { IDatabaseService } from '../database/database.service.interface';
import { AuthAudit } from './auth-audit.entity';
import { IAuthAuditService } from './auth-audit.service.interface';
import { NotFoundException } from '../exception/NotFound.exception';

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

  public async getAll(
    userId: number,
    limitOffset?: LimitOffsetQuery,
  ): Promise<AuthAudit[]> {
    const audits = await this.authAuditRepository.selectAll(
      this.table,
      { userId } as AuthAudit,
      null,
      limitOffset,
    );

    if (!audits.length) {
      throw new NotFoundException(
        `auth audits by user id - ${userId} not found`,
      );
    }

    return audits;
  }
}
