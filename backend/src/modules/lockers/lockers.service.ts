import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Locker } from 'src/entities/entities/Locker';
import { Repository } from 'typeorm';
import { CreateLockerDto } from './dto/createLocker.dto';
import { UpdateLockerDto } from './dto/updateLocker.dto';

@Injectable()
export class LockersService {
  constructor(
    @InjectRepository(Locker)
    private lockersRepository: Repository<Locker>,
  ) {}

  async findAll(): Promise<Locker[]> {
    return this.lockersRepository.find();
  }
  async create(createLockerDto: CreateLockerDto) {
    const locker = this.lockersRepository.create(createLockerDto);

    if (locker !== null || locker !== undefined) {
      return await {
        message: 'Locker is created',
        locker: await this.lockersRepository.save(locker),
      };
    } else {
      return {
        message: 'Locker is already exist',
      };
    }
  }
  async update(id: number, updateLockerDto: UpdateLockerDto) {
    const locker = this.lockersRepository.create(updateLockerDto);
    const isExist = await this.lockersRepository.findOne({ where: { id: id } });
    if (isExist) {
      await this.lockersRepository.update({ id: id }, locker);
      return {
        message: 'Locker is updated',
      };
    }
    return {
      message: 'Locker is not exist',
    };
  }
  async remove(id: number) {
    const isExist = await this.lockersRepository.findOne({ where: { id: id } });
    if (isExist) {
      await this.lockersRepository.delete({ id: id });
      return {
        message: 'Locker is deleted',
      };
    }
    return {
      message: 'Locker is not exist',
    };
  }
}
