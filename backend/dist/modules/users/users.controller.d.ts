import { UsersService } from './users.service';
import { Users } from 'src/entities/entities/Users';
import { CreateUserDto } from './dto/users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<Users[]>;
    findByUsername(username: string): Promise<Users>;
    addUser(user: CreateUserDto): Promise<{
        message: string;
    }>;
    updateUser(user: Users): Promise<{
        message: string;
    }>;
    deleteUser(id: number): Promise<{
        message: string;
    }>;
}
