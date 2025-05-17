import { Cells } from './Cells';
export declare class Users {
    id: number;
    uuid: string | null;
    name: string | null;
    last_name: string | null;
    email: string | null;
    phone: string | null;
    username: string | null;
    role: 'worker' | 'admin';
    password: string | null;
    cells: Cells[];
}
