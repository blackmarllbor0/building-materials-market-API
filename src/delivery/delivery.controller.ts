import { BaseController } from '../app/base.controller';
import { IDeliveryService } from './delivery.service.interface';
import { IUserService } from '../user/user.service.interface';
import { NextFunction, Request, Response } from 'express';
import { Delivery } from './delivery.entity';
import { OrderIdParam } from '../order/params/orderId.param';
import { CreateDeliveryDto } from './dto/createDelivery.dto';
import { User } from '../user/user.entity';
import { UserRoleEnum } from '../user-role/userRole.enun';
import { validateMiddleware } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { UpdateDeliveryDto } from './dto/updateDelivery.dto';

export class DeliveryController extends BaseController {
  constructor(
    private readonly deliverService: IDeliveryService,
    private readonly userService: IUserService,
  ) {
    super('/delivery');
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      this.path,
      validateMiddleware(CreateDeliveryDto),
      authMiddleware(this.userService),
      this.create.bind(this),
    );

    this.router.get(
      this.path,
      authMiddleware(this.userService),
      this.getDelivery.bind(this),
    );

    this.router.patch(
      this.path,
      validateMiddleware(UpdateDeliveryDto),
      authMiddleware(this.userService),
      this.updateById.bind(this),
    );

    this.router.delete(
      this.path,
      authMiddleware(this.userService),
      this.deleteById.bind(this),
    );
  }

  public async create(
    { body }: Request<any, any, CreateDeliveryDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Delivery>> {
    try {
      const delivery = await this.deliverService.create(body);
      return this.created(res, delivery);
    } catch (error) {
      next(error);
    }
  }

  public async getDelivery(
    {
      query: { limit, offset, orderId },
    }: Request<OrderIdParam, any, any, LimitOffsetQuery & OrderIdParam>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Delivery[]>> {
    try {
      const user = res.req['user'] as User;
      if (user.userRoleId === UserRoleEnum.admin && !orderId) {
        const deliveries = await this.deliverService.getDelivery(null, {
          limit,
          offset,
        });
        return this.ok(res, deliveries);
      }

      const deliveries = await this.deliverService.getDelivery(orderId);
      return this.ok(res, deliveries);
    } catch (error) {
      next(error);
    }
  }

  public async updateById(
    {
      query: { orderId },
      body,
    }: Request<any, any, UpdateDeliveryDto, OrderIdParam>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Delivery>> {
    try {
      const updatedDelivery = await this.deliverService.updateDelivery(
        orderId,
        body,
      );
      return this.ok(res, updatedDelivery);
    } catch (error) {
      next(error);
    }
  }
  public async deleteById(
    { query: { orderId } }: Request<any, any, any, OrderIdParam>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await this.deliverService.deleteDelivery(orderId);
      return this.ok(res);
    } catch (error) {
      next(error);
    }
  }
}
