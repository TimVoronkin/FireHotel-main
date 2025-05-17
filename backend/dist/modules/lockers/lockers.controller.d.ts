import { LockersService } from './lockers.service';
import { Locker } from 'src/entities/entities/Locker';
import { CreateLockerDto } from './dto/createLocker.dto';
import { UpdateLockerDto } from './dto/updateLocker.dto';
export declare class LockersController {
    private readonly lockersService;
    constructor(lockersService: LockersService);
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
