import { BaseController } from '../app/base.controller';
import { IAuthAuditEventService } from './auth-audit-event.service.interface';
import { IUserService } from '../user/user.service.interface';
import { NextFunction, Request, Response } from 'express';
import { CreateAuthAuditEventDto } from './dto/createAuthAuditEvemt.dto';
import { AuthAuditEvent } from './auth-audit-event.entity';
import { validateMiddleware } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { UserRoleEnum } from '../user-role/userRole.enun';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { AuthAuditEventIdParam } from './params/authAuditEventId.param';
import { UpdateAuthAuditEventDto } from './dto/updateAuthAuditEvent.dto';

export class AuthAuditEventController extends BaseController {
  constructor(
    private readonly authAuditEventService: IAuthAuditEventService,
    private readonly userService: IUserService,
  ) {
    super('/auth-audit-events');
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      this.path,
      validateMiddleware(CreateAuthAuditEventDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.create.bind(this),
    );

    this.router.get(
      this.path,
      authMiddleware(this.userService),
      this.getAll.bind(this),
    );

    this.router.put(
      `${this.path}/:authAuditEventId`,
      validateMiddleware(UpdateAuthAuditEventDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.updateById.bind(this),
    );
  }

  public async create(
    { body }: Request<any, any, CreateAuthAuditEventDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<AuthAuditEvent>> {
    try {
      const authAuditEvent = await this.authAuditEventService.create(body);
      return this.created(res, authAuditEvent);
    } catch (error) {
      next(error);
    }
  }

  public async getAll(
    { query }: Request<any, any, any, LimitOffsetQuery>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<AuthAuditEvent[]>> {
    try {
      const authAuditEvents = await this.authAuditEventService.getAll(query);
      return this.ok(res, authAuditEvents);
    } catch (error) {
      next(error);
    }
  }

  public async updateById(
    {
      params: { authAuditEventId },
      body,
    }: Request<AuthAuditEventIdParam, any, UpdateAuthAuditEventDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<AuthAuditEvent>> {
    try {
      const updatedAuthAuditEvent = await this.authAuditEventService.updateById(
        authAuditEventId,
        body,
      );
      return this.ok(res, updatedAuthAuditEvent);
    } catch (error) {
      next(error);
    }
  }
}
