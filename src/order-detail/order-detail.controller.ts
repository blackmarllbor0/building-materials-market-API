import { BaseController } from '../app/base.controller';
import { IOrderDetailService } from './order-detail.service.interface';
import { IUserService } from '../user/user.service.interface';
import { NextFunction, Request, Response } from 'express';
import { OrderDetail } from './order-detail.entity';
import { OrderIdParam } from '../order/params/orderId.param';
import { CreateOrderDetailDto } from './dto/crateOrderDetail.dto';
import { validateMiddleware } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { OrderDetailIdParam } from './param/orderDetailId.param';
import { UpdateOrderDetailDro } from './dto/updateOrderDetail.dto';

export class OrderDetailController extends BaseController {
  constructor(
    private readonly orderDetailService: IOrderDetailService,
    private readonly userService: IUserService,
  ) {
    super('/orders/:orderId/order-details');
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      this.path,
      validateMiddleware(CreateOrderDetailDto),
      authMiddleware(this.userService),
      this.create.bind(this),
    );

    this.router.get(
      this.path,
      authMiddleware(this.userService),
      this.getAll.bind(this),
    );

    this.router.patch(
      `${this.path}/:orderDetailId`,
      validateMiddleware(UpdateOrderDetailDro),
      authMiddleware(this.userService),
      this.updateById.bind(this),
    );

    this.router.delete(
      `${this.path}/:orderDetailId`,
      authMiddleware(this.userService),
      this.deleteById.bind(this),
    );
  }

  public async create(
    {
      params: { orderId },
      body,
    }: Request<OrderIdParam, any, CreateOrderDetailDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<OrderDetail>> {
    try {
      const orderDetail = await this.orderDetailService.create({
        orderId,
        ...body,
      });
      return this.created(res, orderDetail);
    } catch (error) {
      next(error);
    }
  }

  public async getAll(
    {
      params: { orderId },
      query,
    }: Request<OrderIdParam, any, any, LimitOffsetQuery>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<OrderDetail[]>> {
    try {
      const orderDetails = await this.orderDetailService.getAll(orderId, query);
      return this.ok(res, orderDetails);
    } catch (error) {
      next(error);
    }
  }

  public async updateById(
    {
      params: { orderDetailId, orderId },
      body,
    }: Request<OrderIdParam & OrderDetailIdParam, any, UpdateOrderDetailDro>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<OrderDetail>> {
    try {
      const updatedOrderDetail = await this.orderDetailService.updateById(
        orderDetailId,
        orderId,
        body,
      );

      return this.ok(res, updatedOrderDetail);
    } catch (error) {
      next(error);
    }
  }

  public async deleteById(
    {
      params: { orderId, orderDetailId },
    }: Request<OrderIdParam & OrderDetailIdParam>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await this.orderDetailService.deleteById(orderDetailId, orderId);
      return this.ok(res);
    } catch (error) {
      next(error);
    }
  }
}
