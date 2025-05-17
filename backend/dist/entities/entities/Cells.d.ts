import { Locker } from './Locker';
import { Orders } from './Orders';
import { Users } from './Users';
export declare class Cells {
    id: number;
    cellNumber: number | null;
    size: 'studio' | '1br' | '2br' | '3br' | 'penthouse' | null;
    status: string | null;
    reserved_until: Date | null;
    order_id: number | null;
    worker_id: number | null;
    locker_id: number;
    locker: Locker;
    order: Orders;
    worker: Users;
    orders: Orders[];
}
