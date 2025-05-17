import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/entities/Users';

import { UsersModule } from './modules/users/users.module';
import { Cells } from './entities/entities/Cells';
import { Locker } from './entities/entities/Locker';
import { Orders } from './entities/entities/Orders';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';
import { CellsModule } from './modules/cells/cells.module';
import { LockersModule } from './modules/lockers/lockers.module';
import { ConfigController } from './modules/config/config.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      entities: [Users, Cells, Locker, Orders],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    OrdersModule,
    CellsModule,
    LockersModule,
  ],
  controllers: [ConfigController],
  providers: [],
})
export class AppModule {}
