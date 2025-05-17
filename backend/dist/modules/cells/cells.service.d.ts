import { Cells } from 'src/entities/entities/Cells';
import { Repository } from 'typeorm';
import { CreateCelLDto } from './dto/createCell.dto';
import { UpdateCellDto } from './dto/updateCell.dto';
import { Locker } from 'src/entities/entities/Locker';
export declare class CellsService {
    private readonly cellsRepository;
    private readonly lockersRepository;
    constructor(cellsRepository: Repository<Cells>, lockersRepository: Repository<Locker>);
    findAll(): Promise<Cells[]>;
    create(createCellDto: CreateCelLDto): Promise<{
        message: string;
        cell: Cells;
    } | {
        message: string;
        cell?: undefined;
    }>;
    update(id: number, updateCellDto: UpdateCellDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
