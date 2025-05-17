export declare class UpdateCellDto {
    cell_number: number;
    locker_id: number;
    size: 'studio' | '1br' | '2br' | '3br' | 'penthouse';
    status: 'free' | 'reserved';
    reserved_until: Date;
    order_id: number;
    worker_id: number;
}
