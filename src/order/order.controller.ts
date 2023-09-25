import { BaseController } from '../app/base.controller';
import { IOrderService } from './order.service.interface';
import { IUserService } from '../user/user.service.interface';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UserIdParam } from '../user/param/userId.param';
import { NextFunction, Request, Response } from 'express';
import { Order } from './order.entity';
import { validateMiddleware } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { OrderStatusIdParam } from '../order-status/params/order-status-id.param';
import { OrderIdParam } from './params/orderId.param';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { OrderHistory } from '../order-history/order-history.entity';
import { User } from '../user/user.entity';
import { UserRoleEnum } from '../user-role/userRole.enun';
import { UserNotFoundException } from '../user/exception/userNotFound.exception';

export class OrderController extends BaseController {
  constructor(
    private readonly orderService: IOrderService,
    private readonly userService: IUserService,
  ) {
    super('/orders');
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      this.path,
      validateMiddleware(CreateOrderDto),
      authMiddleware(this.userService),
      this.create.bind(this),
    );

    this.router.get(
      this.path,
      authMiddleware(this.userService),
      this.getAll.bind(this),
    );

    this.router.get(
      `${this.path}/:orderId`,
      authMiddleware(this.userService),
      this.getById.bind(this),
    );

    this.router.patch(
      `${this.path}/:orderId`,
      validateMiddleware(UpdateOrderDto),
      authMiddleware(this.userService),
      this.updateById.bind(this),
    );

    this.router.delete(
      `${this.path}/:orderId`,
      authMiddleware(this.userService),
      this.deleteById.bind(this),
    );

    this.router.get(
      `${this.path}/:orderId/history`,
      authMiddleware(this.userService),
      this.getHistory.bind(this),
    );
  }

  public async create(
    { body }: Request<any, any, CreateOrderDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Order>> {
    try {
      const order = await this.orderService.create(body);
      return this.created(res, order);
    } catch (error) {
      next(error);
    }
  }

  public async getAll(
    {
      query: { userId, limit, offset, orderStatusId },
    }: Request<
      any,
      any,
      any,
      UserIdParam & LimitOffsetQuery & OrderStatusIdParam
    >,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Order[]>> {
    try {
      const user = res.req['user'] as User;
      if (user.userRoleId === UserRoleEnum.admin && !userId) {
        const orders = await this.orderService.getAll(
          null,
          { limit, offset },
          { orderStatusId },
        );

        return this.ok(res, orders);
      }

      if (!userId) {
        next(new UserNotFoundException(userId));
      }

      const orders = await this.orderService.getAll(
        { userId },
        { limit, offset },
        { orderStatusId },
      );

      return this.ok(res, orders);
    } catch (error) {
      next(error);
    }
  }

  public async getById(
    { params: { orderId } }: Request<OrderIdParam>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Order>> {
    try {
      const order = await this.orderService.getById(orderId);
      return this.ok(res, order);
    } catch (error) {
      next(error);
    }
  }

  public async updateById(
    { params: { orderId }, body }: Request<OrderIdParam, any, UpdateOrderDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Order>> {
    try {
      const updatedOrder = await this.orderService.updateById(orderId, body);
      return this.ok(res, updatedOrder);
    } catch (error) {
      next(error);
    }
  }

  public async deleteById(
    { params: { orderId } }: Request<OrderIdParam>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await this.orderService.deleteById(orderId);
      return this.ok(res);
    } catch (error) {
      next(error);
    }
  }

  public async getHistory(
    {
      params: { orderId },
      query,
    }: Request<OrderIdParam, any, any, LimitOffsetQuery>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<OrderHistory[]>> {
    try {
      const orderHistory = await this.orderService.getHistory(
        { orderId },
        query,
      );
      return this.ok(res, orderHistory);
    } catch (error) {
      next(error);
    }
  }
}
