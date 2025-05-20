import { Cells } from './Cells';
import { Locker } from './Locker';
export declare class Orders {
    id: number;
    orderUuid: string | null;
    email: string;
    cell_id: number;
    locker_id: number;
    DateFrom: Date;
    DateTo: Date;
    Name: string;
    Surname: string;
    cells: Cells[];
    cell: Cells;
    locker: Locker;
}
