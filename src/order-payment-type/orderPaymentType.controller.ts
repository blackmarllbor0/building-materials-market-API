import { BaseController } from '../app/base.controller';
import { IOrderPaymentTypeService } from './orderPaymentType.service.interface';
import { IUserService } from '../user/user.service.interface';
import { NextFunction, Request, Response } from 'express';
import { CreateOrderPaymentTypeDto } from './dto/createOrderPaymenttype.dto';
import { OrderPaymentType } from './order-payment-type.entity';
import { validateMiddleware } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { UserRoleEnum } from '../user-role/userRole.enun';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { OrderPaymentTypeId } from './params/orderPaymentTypeId.param';
import { UpdateOrderPaymentTypeDto } from './dto/updateOrderPaymentType.dto';

export class OrderPaymentTypeController extends BaseController {
  constructor(
    private readonly orderPaymentTypeService: IOrderPaymentTypeService,
    private readonly userService: IUserService,
  ) {
    super('/order-payment-types');
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      this.path,
      validateMiddleware(CreateOrderPaymentTypeDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.create.bind(this),
    );

    this.router.get(
      this.path,
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.getAll.bind(this),
    );

    this.router.put(
      `${this.path}/:orderPaymentTypeId`,
      validateMiddleware(UpdateOrderPaymentTypeDto),
      authMiddleware(this.userService, UserRoleEnum.admin),
      this.updateById.bind(this),
    );
  }

  public async create(
    { body }: Request<any, any, CreateOrderPaymentTypeDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<OrderPaymentType>> {
    try {
      const orderPaymentType = await this.orderPaymentTypeService.create(body);
      return this.created(res, orderPaymentType);
    } catch (error) {
      next(error);
    }
  }

  public async getAll(
    { query }: Request<any, any, any, LimitOffsetQuery>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<OrderPaymentType[]>> {
    try {
      const orderPaymentTypes =
        await this.orderPaymentTypeService.getAll(query);
      return this.ok(res, orderPaymentTypes);
    } catch (error) {
      next(error);
    }
  }

  public async updateById(
    {
      params: { orderPaymentTypeId },
      body,
    }: Request<OrderPaymentTypeId, any, UpdateOrderPaymentTypeDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<OrderPaymentType>> {
    try {
      const updatedOrderPaymentType =
        await this.orderPaymentTypeService.updateById(orderPaymentTypeId, body);
      return this.ok(res, updatedOrderPaymentType);
    } catch (error) {
      next(error);
    }
  }
}
