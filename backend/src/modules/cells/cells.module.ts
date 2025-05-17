import { Module } from '@nestjs/common';
import { CellsService } from './cells.service';
import { CellsController } from './cells.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cells } from 'src/entities/entities/Cells';
import { Locker } from 'src/entities/entities/Locker';

@Module({
  imports: [TypeOrmModule.forFeature([Cells, Locker])],
  controllers: [CellsController],
  providers: [CellsService],
})
export class CellsModule {}
