import { UserIdParam } from '../user/param/userId.param';
import { CreateFeedbackDto } from './dto/createFeedback.dto';
import { Feedback } from './feedback.entity';
import { ProductIdParam } from '../product/param/productId.param';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { UpdateFeedbackDto } from './dto/updateFeedback.dto';

export interface IFeedbackService {
  create(createDto: CreateFeedbackDto): Promise<Feedback>;
  getAll(
    userId?: UserIdParam,
    productId?: ProductIdParam,
    limitOffset?: LimitOffsetQuery,
  ): Promise<Feedback[]>;
  getById(id: number): Promise<Feedback>;
  updateById(id: number, updateDto: UpdateFeedbackDto): Promise<Feedback>;
  deleteById(id: number): Promise<void>;
}
