import { Orders } from 'src/entities/entities/Orders';
import { Repository } from 'typeorm';
import { CreateOrderDto, DeleteOrderDto, UpdateOrderDto } from './orders.dto';
import { Locker } from 'src/entities/entities/Locker';
import { Cells } from 'src/entities/entities/Cells';
export declare class OrdersService {
    private ordersRepository;
    private lockersRepository;
    private cellsRepository;
    constructor(ordersRepository: Repository<Orders>, lockersRepository: Repository<Locker>, cellsRepository: Repository<Cells>);
    findAll(): Promise<Orders[]>;
    findByOrderUuid(orderUuid: string): Promise<Orders>;
    create(createOrderDto: CreateOrderDto): Promise<{
        message: string;
        order: {
            id: number;
            orderUuid: string;
            locker_id: number;
            cell_id: number;
        };
    }>;
    update(updateOrderDto: UpdateOrderDto): Promise<{
        message: string;
        order: {
            id: number;
            orderUuid: string;
            locker_id: number;
            cell_id: number;
            email: string;
        };
    }>;
    delete(delteOrderDto: DeleteOrderDto): Promise<{
        message: string;
    }>;
}
