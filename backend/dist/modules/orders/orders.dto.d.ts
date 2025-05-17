export declare class CreateOrderDto {
    email: string;
    cell_id: number;
    locker_id: number;
    worker_id: number;
}
export declare class UpdateOrderDto {
    orderUuid: string;
    cell_id: number;
    email: string;
    locker_id: number;
}
export declare class DeleteOrderDto {
    orderUuid: string;
}
