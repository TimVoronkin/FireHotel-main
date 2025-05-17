import { Users } from 'src/entities/entities/Users';
import { Repository } from 'typeorm';
import { CreateUserDto, DeleteUserDto, UpdateUserDto } from './dto/users.dto';
import { ConfigService } from '@nestjs/config';
export declare class UsersService {
    private usersRepository;
    private configService;
    constructor(usersRepository: Repository<Users>, configService: ConfigService);
    findAll(): Promise<Users[]>;
    findByUsername(username: string): Promise<Users>;
    createUser(createUserDto: CreateUserDto): Promise<{
        message: string;
    }>;
    updateUser(updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
    deleteUser(deleteUserDto: DeleteUserDto): Promise<{
        message: string;
    }>;
}
