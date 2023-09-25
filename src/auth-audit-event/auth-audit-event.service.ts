import { IDatabaseService } from '../database/database.service.interface';
import { IAuthAuditEventService } from './auth-audit-event.service.interface';
import { AuthAuditEvent } from './auth-audit-event.entity';
import { CreateAuthAuditEventDto } from './dto/createAuthAuditEvemt.dto';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { UpdateAuthAuditEventDto } from './dto/updateAuthAuditEvent.dto';
import { AuthAuditEventAlreadyExistsException } from './exceptions/authAuditEventAlreadyExists.exception';
import { AuthAuditEventNotFoundException } from './exceptions/authAuditEventNotFound.exception';

export class AuthAuditEventService implements IAuthAuditEventService {
  private readonly table: string = 'auth_audit_event';
  constructor(private readonly authAuditRepository: IDatabaseService) {}

  public async create(
    crateDto: CreateAuthAuditEventDto,
  ): Promise<AuthAuditEvent> {
    try {
      return this.authAuditRepository.insert(this.table, {
        ...crateDto,
      } as AuthAuditEvent);
    } catch (error) {
      throw new AuthAuditEventAlreadyExistsException();
    }
  }

  async getAll(limitOffset?: LimitOffsetQuery): Promise<AuthAuditEvent[]> {
    const authAuditEvents =
      await this.authAuditRepository.selectAll<AuthAuditEvent>(
        this.table,
        null,
        null,
        limitOffset,
      );

    if (!authAuditEvents.length) {
      throw new AuthAuditEventNotFoundException();
    }

    return authAuditEvents;
  }

  async updateById(
    id: number,
    updateDto: UpdateAuthAuditEventDto,
  ): Promise<AuthAuditEvent> {
    const authAuditEvent = await this.authAuditRepository.selectOne(
      this.table,
      { id } as AuthAuditEvent,
      { id } as AuthAuditEvent,
    );

    if (!authAuditEvent) {
      throw new AuthAuditEventNotFoundException(id);
    }

    try {
      return this.authAuditRepository.update(
        this.table,
        {
          ...updateDto,
          updateDate: new Date(),
        } as unknown as AuthAuditEvent,
        {
          id,
        } as AuthAuditEvent,
      );
    } catch (error) {
      throw new AuthAuditEventAlreadyExistsException();
    }
  }
}
