import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/entities/entities/Orders';
import { Repository } from 'typeorm';
import { CreateOrderDto, DeleteOrderDto, UpdateOrderDto } from './orders.dto';
import { Locker } from 'src/entities/entities/Locker';
import { Cells } from 'src/entities/entities/Cells';
import { TrackNumberGenerator } from 'src/common/trackNumberGenerator';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepository: Repository<Orders>,
    @InjectRepository(Locker)
    private lockersRepository: Repository<Locker>,
    @InjectRepository(Cells)
    private cellsRepository: Repository<Cells>,
  ) {}

  findAll(): Promise<Orders[]> {
    return this.ordersRepository.find();
  }

  findByOrderUuid(orderUuid: string): Promise<Orders> {
    return this.ordersRepository.findOne({ where: { orderUuid: orderUuid } });
  }

  async create(createOrderDto: CreateOrderDto) {
    const generator = new TrackNumberGenerator();
    const lockerIsExist = await this.lockersRepository.findOne({ where: { id: createOrderDto.locker_id } });
    const cellIsExistAndFree = await this.cellsRepository.findOne({
      where: { id: createOrderDto.cell_id, status: 'free', locker: { id: createOrderDto.locker_id } },
    });
    const reservedUntil = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
    const orderUuid = generator.generate();
    if (lockerIsExist && cellIsExistAndFree) {
      const order = await this.ordersRepository.save({
        orderUuid: orderUuid,
        cell: cellIsExistAndFree,
        locker: lockerIsExist,
        email: createOrderDto.email,
      });
      const complectedOrder = {
        id: order.id,
        orderUuid: order.orderUuid,
        locker_id: order.locker.id,
        cell_id: order.cell_id,
      };
      await this.cellsRepository.update(
        { id: createOrderDto.cell_id },
        { status: 'reserved', order: order, reserved_until: reservedUntil, worker: { id: createOrderDto.worker_id } },
      );

      return {
        message: 'Order is created',
        order: complectedOrder,
      };
    }

    throw new HttpException('Locker or cell is not exist or cell is not free', 400);
  }
  async update(updateOrderDto: UpdateOrderDto) {
    const orderIsExist = await this.ordersRepository.findOne({ where: { orderUuid: updateOrderDto.orderUuid } });
    if (orderIsExist !== null) {
      const complectedOrder = {
        id: orderIsExist.id,
        orderUuid: orderIsExist.orderUuid,
        locker_id: orderIsExist.locker_id,
        cell_id: orderIsExist.cell_id,
        email: orderIsExist.email,
      };
      await this.ordersRepository.update({ orderUuid: updateOrderDto.orderUuid }, updateOrderDto);
      return {
        message: 'Order is updated',
        order: complectedOrder,
      };
    }
    throw new HttpException('Order is not exist', 400);
  }

  async delete(delteOrderDto: DeleteOrderDto) {
    const orderIsExist = await this.ordersRepository.findOne({ where: { orderUuid: delteOrderDto.orderUuid } });
    if (orderIsExist !== null) {
      await this.ordersRepository.delete({ orderUuid: delteOrderDto.orderUuid });
      await this.cellsRepository.update(
        { id: orderIsExist.cell_id },
        { status: 'free', worker_id: null, reserved_until: null },
      );
      return {
        message: 'Order is deleted',
      };
    }
    throw new HttpException('Order is not exist', 400);
  }
}
