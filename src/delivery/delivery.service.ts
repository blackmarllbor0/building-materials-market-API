import { IDatabaseService } from '../database/database.service.interface';
import { IDeliveryService } from './delivery.service.interface';
import { Delivery } from './delivery.entity';
import { CreateDeliveryDto } from './dto/createDelivery.dto';
import { UpdateDeliveryDto } from './dto/updateDelivery.dto';
import { DeliveryNotFoundException } from './exceptions/deliveryNotFound.exception';
import { HttpException } from '../exception/HttpException';
import { INTERNAL_SERVER_ERROR } from 'http-status';
import { DeliveryAlreadyExistsException } from './exceptions/deliveryAlreadyExists.exception';
import { LimitOffsetQuery } from '../params/LimitOffset.query';

export class DeliveryService implements IDeliveryService {
  private readonly table: string = 'delivery';
  constructor(private readonly deliveryRepository: IDatabaseService) {}

  public async create(createDto: CreateDeliveryDto): Promise<Delivery> {
    createDto.approximateDate = new Date(createDto.approximateDate);
    const delivery = await this.deliveryRepository.selectOne(
      this.table,
      { orderId: createDto.orderId, isDeleted: 0 } as Delivery,
      { id: 0 } as Delivery,
    );

    if (delivery) throw new DeliveryAlreadyExistsException();

    return this.deliveryRepository.insert(this.table, {
      ...createDto,
    } as Delivery);
  }

  public async getDelivery(
    orderId?: number,
    limitOffset?: LimitOffsetQuery,
  ): Promise<Delivery[]> {
    const where = { isDeleted: 0 } as Delivery;
    if (orderId) where.orderId = orderId;

    const delivery = await this.deliveryRepository.selectAll(
      this.table,
      where as Delivery,
      null,
      limitOffset,
    );

    if (!delivery.length) throw new DeliveryNotFoundException(orderId);

    if (delivery.length > 1 && orderId) {
      throw new HttpException(
        INTERNAL_SERVER_ERROR,
        `there can only be one error per order, please contact the administrator - order id - ${orderId}`,
      );
    }

    return delivery;
  }

  public async updateDelivery(
    orderId: number,
    updateDto: UpdateDeliveryDto,
  ): Promise<Delivery> {
    const delivery = await this.deliveryRepository.selectOne(
      this.table,
      { orderId, isDeleted: 0 } as Delivery,
      { id: 0 } as Delivery,
    );

    if (!delivery) throw new DeliveryNotFoundException(orderId);

    try {
      return this.deliveryRepository.update(
        this.table,
        { ...updateDto, updateDate: new Date() } as Delivery,
        { orderId } as Delivery,
      );
    } catch (error) {
      throw new DeliveryAlreadyExistsException();
    }
  }

  public async deleteDelivery(orderId: number): Promise<void> {
    const delivery = await this.deliveryRepository.selectOne(
      this.table,
      { orderId, isDeleted: 0 } as Delivery,
      { id: 0 } as Delivery,
    );

    if (!delivery) throw new DeliveryNotFoundException(orderId);

    await this.deliveryRepository.update(
      this.table,
      { updateDate: new Date(), isDeleted: 1 } as Delivery,
      { orderId } as Delivery,
    );
  }
}
