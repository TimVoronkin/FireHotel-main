import { CellsService } from './cells.service';
import { Cells } from 'src/entities/entities/Cells';
import { CreateCelLDto } from './dto/createCell.dto';
import { UpdateCellDto } from './dto/updateCell.dto';
export declare class CellsController {
    private readonly cellsService;
    constructor(cellsService: CellsService);
    findAll(): Promise<Cells[]>;
    create(createCellDto: CreateCelLDto): Promise<Cells | object>;
    update(id: number, updateCellDto: UpdateCellDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
