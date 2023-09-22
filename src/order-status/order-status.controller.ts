import { BaseController } from '../app/base.controller';
import { IOrderStatusService } from './order-status.service.interface';
import { IUserService } from '../user/user.service.interface';
import { CreateOrderStatusDto } from './dto/createOrderStatus.dto';
import { NextFunction, Request, Response } from 'express';
import { OrderStatus } from './order-status.entity';
import { validateMiddleware } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { UserRoleEnum } from '../user-role/userRole.enun';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { OrderStatusIdParam } from './params/order-status-id.param';
import { UpdateOrderStatusDto } from './dto/updateOrderStatus.dto';

export class OrderStatusController extends BaseController {
  constructor(
    private readonly orderStatusService: IOrderStatusService,
    private readonly userService: IUserService,
  ) {
    super('/order-statuses');
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      this.path,
      validateMiddleware(CreateOrderStatusDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.create.bind(this),
    );

    this.router.get(
      this.path,
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.getAll.bind(this),
    );

    this.router.patch(
      `${this.path}/:orderStatusId`,
      validateMiddleware(UpdateOrderStatusDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.updateById.bind(this),
    );
  }

  public async create(
    { body }: Request<any, any, CreateOrderStatusDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<OrderStatus>> {
    try {
      const orderStatus = await this.orderStatusService.create(body);
      return this.created(res, orderStatus);
    } catch (error) {
      next(error);
    }
  }

  public async getAll(
    { query }: Request<any, any, any, LimitOffsetQuery>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<OrderStatus[]>> {
    try {
      const orderStatuses = await this.orderStatusService.getAll(query);
      return this.ok(res, orderStatuses);
    } catch (error) {
      next(error);
    }
  }

  public async updateById(
    {
      params: { orderStatusId },
      body,
    }: Request<OrderStatusIdParam, any, UpdateOrderStatusDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<OrderStatus>> {
    try {
      const updatedOrderStatus = await this.orderStatusService.updateById(
        orderStatusId,
        body,
      );

      return this.ok(res, updatedOrderStatus);
    } catch (error) {
      next(error);
    }
  }
}
