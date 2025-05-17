import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/entities/entities/Orders';
import { Cells } from 'src/entities/entities/Cells';
import { Locker } from 'src/entities/entities/Locker';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Cells, Locker])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
