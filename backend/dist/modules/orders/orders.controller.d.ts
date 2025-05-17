import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderDto } from './orders.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    findAll(): Promise<import("../../entities/entities/Orders").Orders[]>;
    create(order: CreateOrderDto): Promise<{
        message: string;
        order: {
            id: number;
            orderUuid: string;
            locker_id: number;
            cell_id: number;
        };
    }>;
    update(order: UpdateOrderDto): Promise<{
        message: string;
        order: {
            id: number;
            orderUuid: string;
            locker_id: number;
            cell_id: number;
            email: string;
        };
    }>;
    delete(order: string): Promise<{
        message: string;
    }>;
}
