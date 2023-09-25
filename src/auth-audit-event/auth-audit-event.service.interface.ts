import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { AuthAuditEvent } from './auth-audit-event.entity';
import { CreateAuthAuditEventDto } from './dto/createAuthAuditEvemt.dto';
import { UpdateAuthAuditEventDto } from './dto/updateAuthAuditEvent.dto';

export interface IAuthAuditEventService {
  create(crateDto: CreateAuthAuditEventDto): Promise<AuthAuditEvent>;
  getAll(limitOffset?: LimitOffsetQuery): Promise<AuthAuditEvent[]>;
  updateById(
    id: number,
    updateDto: UpdateAuthAuditEventDto,
  ): Promise<AuthAuditEvent>;
}
