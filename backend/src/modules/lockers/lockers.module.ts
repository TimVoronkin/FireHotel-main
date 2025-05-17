import { Module } from '@nestjs/common';
import { LockersService } from './lockers.service';
import { LockersController } from './lockers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locker } from 'src/entities/entities/Locker';

@Module({
  imports: [TypeOrmModule.forFeature([Locker])],
  controllers: [LockersController],
  providers: [LockersService],
})
export class LockersModule {}
