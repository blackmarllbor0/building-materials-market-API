import { NotFoundException } from '../../exception/NotFound.exception';

export class FeedbackNotFoundException extends NotFoundException {
  constructor(id?: number) {
    super(
      id ? `feedback with this id - ${id} not found` : 'feedbacks not found',
    );
  }
}
