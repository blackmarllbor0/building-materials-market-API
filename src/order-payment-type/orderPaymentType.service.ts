import { IDatabaseService } from '../database/database.service.interface';
import { IOrderPaymentTypeService } from './orderPaymentType.service.interface';
import { LimitOffsetQuery } from '../params/LimitOffset.query';
import { CreateOrderPaymentTypeDto } from './dto/createOrderPaymenttype.dto';
import { UpdateOrderPaymentTypeDto } from './dto/updateOrderPaymentType.dto';
import { OrderPaymentType } from './order-payment-type.entity';
import { OrderPaymentTypeAlreadyExistsException } from './exceptions/orderPaymentTypeAlreadyExist.exception';
import { OrderStatusNotFoundException } from '../order-status/exceptions/orderStatusNotFound.exception';
import { OrderStatusAlreadyExistsException } from '../order-status/exceptions/orderStatusAlreadyExists.exception';

export class OrderPaymentTypeService implements IOrderPaymentTypeService {
  private readonly table: string = 'order_payment_type';

  constructor(private readonly orderPaymentTypeRepository: IDatabaseService) {}

  create(createDto: CreateOrderPaymentTypeDto): Promise<OrderPaymentType> {
    try {
      return this.orderPaymentTypeRepository.insert(this.table, {
        ...createDto,
      } as OrderPaymentType);
    } catch (error) {
      throw new OrderPaymentTypeAlreadyExistsException();
    }
  }

  async getAll(limitOffset?: LimitOffsetQuery): Promise<OrderPaymentType[]> {
    const orderPaymentTypes = await this.orderPaymentTypeRepository.selectAll(
      this.table,
      null,
      null,
      limitOffset,
    );

    if (!orderPaymentTypes.length) {
      throw new OrderStatusNotFoundException();
    }

    return orderPaymentTypes;
  }

  async updateById(
    id: number,
    updateDto: UpdateOrderPaymentTypeDto,
  ): Promise<OrderPaymentType> {
    const orderPaymentTypes = await this.orderPaymentTypeRepository.selectOne(
      this.table,
      { id } as OrderPaymentType,
      { id } as OrderPaymentType,
    );

    if (!orderPaymentTypes) {
      throw new OrderStatusNotFoundException(id);
    }

    try {
      return this.orderPaymentTypeRepository.update(
        this.table,
        {
          ...updateDto,
          updateDate: new Date(),
        } as unknown as OrderPaymentType,
        { id } as OrderPaymentType,
      );
    } catch (error) {
      throw new OrderStatusAlreadyExistsException();
    }
  }
}
