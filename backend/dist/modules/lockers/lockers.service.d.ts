import { Locker } from 'src/entities/entities/Locker';
import { Repository } from 'typeorm';
import { CreateLockerDto } from './dto/createLocker.dto';
import { UpdateLockerDto } from './dto/updateLocker.dto';
export declare class LockersService {
    private lockersRepository;
    constructor(lockersRepository: Repository<Locker>);
    findAll(): Promise<Locker[]>;
    create(createLockerDto: CreateLockerDto): Promise<{
        message: string;
        locker: Locker;
    } | {
        message: string;
        locker?: undefined;
    }>;
    update(id: number, updateLockerDto: UpdateLockerDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
