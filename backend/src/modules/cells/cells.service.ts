import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cells } from 'src/entities/entities/Cells';
import { Repository } from 'typeorm';
import { CreateCelLDto } from './dto/createCell.dto';
import { UpdateCellDto } from './dto/updateCell.dto';
import { Locker } from 'src/entities/entities/Locker';

@Injectable()
export class CellsService {
  constructor(
    @InjectRepository(Cells)
    private readonly cellsRepository: Repository<Cells>,
    @InjectRepository(Locker)
    private readonly lockersRepository: Repository<Locker>,
  ) {}

  async findAll(): Promise<Cells[]> {
    return this.cellsRepository.find();
  }

  async create(createCellDto: CreateCelLDto) {
    const cell = this.cellsRepository.create(createCellDto);
    const lockerIsExist = await this.lockersRepository.findOne({ where: { id: createCellDto.locker_id } });
    const isExist = await this.cellsRepository.findOne({
      where: { cellNumber: createCellDto.cellNumber, locker: { id: createCellDto.locker_id } },
    });
    if (!isExist && lockerIsExist) {
      cell.locker = lockerIsExist;
      return {
        message: 'Cell is created',
        cell: await this.cellsRepository.save(cell),
      };
    }
    return {
      message: 'Cell is already exist or locker is not exist',
    };
  }

  async update(id: number, updateCellDto: UpdateCellDto) {
    const cell = this.cellsRepository.create(updateCellDto);
    const isExist = await this.cellsRepository.findOne({ where: { id: id } });
    if (isExist) {
      await this.cellsRepository.update({ id: id }, cell);
      return {
        message: 'Cell is updated',
      };
    }
    return {
      message: 'Cell is not exist',
    };
  }

  async remove(id: number) {
    const isExist = await this.cellsRepository.findOne({ where: { id: id } });
    if (isExist) {
      await this.cellsRepository.delete({ id: id });
      return {
        message: 'Cell is deleted',
      };
    }
    return {
      message: 'Cell is not exist',
    };
  }
}
