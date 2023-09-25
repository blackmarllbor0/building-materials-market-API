import { IDatabaseService } from '../database/database.service.interface';
import { IFeedbackService } from './feedback.service.interface';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { Feedback } from './feedback.entity';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { ProductIdParam } from '../product/param/productId.param';
import { UserIdParam } from '../user/param/userId.param';
import { UpdateFeedbackDto } from './dto/updateFeedback.dto';
import { FeedbackAlreadyExistsException } from './exceptions/feedbackAlreadyExists.exception';
import { FeedbackNotFoundException } from './exceptions/feedbackNotFound.exception';

export class FeedbackService implements IFeedbackService {
  private readonly table: string = 'feedback';
  constructor(private readonly feedbackRepository: IDatabaseService) {}

  async create(createDto: CreateFeedbackDto): Promise<Feedback> {
    try {
      return this.feedbackRepository.insert(this.table, {
        ...createDto,
      } as Feedback);
    } catch (error) {
      throw new FeedbackAlreadyExistsException();
    }
  }

  async getAll(
    userId?: UserIdParam,
    productId?: ProductIdParam,
    limitOffset?: LimitOffsetQuery,
  ): Promise<Feedback[]> {
    const where = { isDeleted: 0 } as Feedback;

    if (userId && userId.userId) where.userId = userId.userId;

    if (productId && productId.productId) where.productId = productId.productId;

    const feedbacks = await this.feedbackRepository.selectAll(
      this.table,
      where,
      null,
      limitOffset,
    );

    if (!feedbacks.length) throw new FeedbackNotFoundException();

    return feedbacks;
  }

  async getById(id: number): Promise<Feedback> {
    const feedback = await this.feedbackRepository.selectOne(this.table, {
      id,
    } as Feedback);

    if (!feedback) throw new FeedbackNotFoundException(id);

    return feedback;
  }

  async updateById(
    id: number,
    updateDto: UpdateFeedbackDto,
  ): Promise<Feedback> {
    const feedback = await this.feedbackRepository.selectOne(
      this.table,
      { id } as Feedback,
      { id } as Feedback,
    );

    if (!feedback) throw new FeedbackNotFoundException(id);

    return this.feedbackRepository.update(
      this.table,
      {
        ...updateDto,
        updateDate: new Date(),
      } as Feedback,
      { id } as Feedback,
    );
  }

  async deleteById(id: number): Promise<void> {
    const feedback = await this.feedbackRepository.selectOne(
      this.table,
      { id } as Feedback,
      { id } as Feedback,
    );

    if (!feedback) throw new FeedbackNotFoundException(id);

    await this.feedbackRepository.update(
      this.table,
      { isDeleted: 1 } as Feedback,
      { id } as Feedback,
    );
  }
}
