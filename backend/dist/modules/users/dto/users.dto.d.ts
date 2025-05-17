export declare class CreateUserDto {
    name: string;
    last_name: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    role: 'worker' | 'admin';
}
export declare class UpdateUserDto {
    username: string;
    name?: string | null;
    last_name?: string | null;
    email?: string;
    phone?: string;
    password?: string | null;
}
export declare class DeleteUserDto {
    id: number;
}
