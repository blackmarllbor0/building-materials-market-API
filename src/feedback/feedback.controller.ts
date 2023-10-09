import { BaseController } from '../app/base.controller';
import { IFeedbackService } from './feedback.service.interface';
import { IUserService } from '../user/user.service.interface';
import { NextFunction, Request, Response } from 'express';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { Feedback } from './feedback.entity';
import { validateMiddleware } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { UserIdParam } from '../user/param/userId.param';
import { ProductIdParam } from '../product/param/productId.param';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { User } from '../user/user.entity';
import { UserRoleEnum } from '../user-role/userRole.enun';
import { NotFoundException } from '../exception/NotFound.exception';
import { FeedbackIdParam } from './params/feedbackId.param';
import { UpdateFeedbackDto } from './dto/updateFeedback.dto';

export class FeedbackController extends BaseController {
  constructor(
    private readonly feedbackService: IFeedbackService,
    private readonly userService: IUserService,
  ) {
    super('/feedback');
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      this.path,
      validateMiddleware(CreateFeedbackDto),
      authMiddleware(this.userService),
      this.create.bind(this),
    );

    this.router.get(
      this.path,
      authMiddleware(this.userService),
      this.getAll.bind(this),
    );

    this.router.get(
      `${this.path}/:feedbackId`,
      authMiddleware(this.userService),
      this.getById.bind(this),
    );

    this.router.patch(
      `${this.path}/:feedbackId`,
      authMiddleware(this.userService),
      this.updateById.bind(this),
    );

    this.router.delete(
      `${this.path}/:feedbackId`,
      authMiddleware(this.userService),
      this.deleteById.bind(this),
    );
  }

  public async create(
    { body }: Request<any, any, CreateFeedbackDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Feedback>> {
    try {
      const feedback = await this.feedbackService.create(body);
      return this.created(res, feedback);
    } catch (error) {
      next(error);
    }
  }

  public async getAll(
    {
      query: { limit, offset, productId, userId, rating },
    }: Request<
      any,
      any,
      any,
      UserIdParam & ProductIdParam & LimitOffsetQuery & { rating: number }
    >,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Feedback[]>> {
    try {
      const user = res.req['user'] as User;
      if (user.userRoleId === UserRoleEnum.admin && !productId && !userId) {
        const feedback = await this.feedbackService.getAll(
          null,
          null,
          {
            limit,
            offset,
          },
          rating,
        );

        return this.ok(res, feedback);
      }

      if (!productId && !userId) {
        next(
          new NotFoundException(
            'feedback with user id or product id not found',
          ),
        );
      }
      const feedback = await this.feedbackService.getAll(
        { userId },
        { productId },
        {
          limit,
          offset,
        },
        rating,
      );

      return this.ok(res, feedback);
    } catch (error) {
      next(error);
    }
  }

  public async getById(
    { params: { feedbackId } }: Request<FeedbackIdParam>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Feedback>> {
    try {
      const feedback = await this.feedbackService.getById(feedbackId);
      return this.ok(res, feedback);
    } catch (error) {
      next(error);
    }
  }

  public async updateById(
    {
      params: { feedbackId },
      body,
    }: Request<FeedbackIdParam, any, UpdateFeedbackDto>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<Feedback>> {
    try {
      const updatedFeedback = await this.feedbackService.updateById(
        feedbackId,
        body,
      );
      return this.ok(res, updatedFeedback);
    } catch (error) {
      next(error);
    }
  }

  public async deleteById(
    { params: { feedbackId } }: Request<FeedbackIdParam>,
    res: Response,
    next: NextFunction,
  ): Promise<Response<void>> {
    try {
      await this.feedbackService.deleteById(feedbackId);
      return this.ok(res);
    } catch (error) {
      next(error);
    }
  }
}
