import { Cells } from './Cells';
import { Orders } from './Orders';
export declare class Locker {
    id: number;
    total_cells: number;
    location: string;
    name: string;
    description: string | null;
    cells: Cells[];
    orders: Orders[];
}
