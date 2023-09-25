import { IDatabaseService } from '../database/database.service.interface';
import { IOrderHistoryService } from './order-history.service.interface';
import { CreateOrderHistoryDto } from './dto/createOrderHisotry.dto';
import { OrderHistory } from './order-history.entity';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { OrderHistoryAlreadyExistsException } from './exceptions/orderHistoryAlreadyExists.exception';
import { OrderHistoryNotFound } from './exceptions/orderHistoryNotFound.exception';
import { OrderIdParam } from '../order/params/orderId.param';

export class OrderHistoryService implements IOrderHistoryService {
  private readonly table: string = 'order_history';

  constructor(private readonly orderHistoryRepository: IDatabaseService) {}

  public async create(createDto: CreateOrderHistoryDto): Promise<OrderHistory> {
    try {
      return this.orderHistoryRepository.insert(this.table, {
        ...createDto,
      } as OrderHistory);
    } catch (error) {
      throw new OrderHistoryAlreadyExistsException();
    }
  }

  public async getAll(
    { orderId }: OrderIdParam,
    limitOffset?: LimitOffsetQuery,
  ): Promise<OrderHistory[]> {
    const orderHistories = await this.orderHistoryRepository.selectAll(
      this.table,
      { orderId } as unknown as OrderHistory,
      null,
      limitOffset,
    );

    if (!orderHistories.length) throw new OrderHistoryNotFound();

    return orderHistories;
  }
}
