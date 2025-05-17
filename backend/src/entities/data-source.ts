import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { Cells } from './entities/Cells';
import { Users } from './entities/Users';
import { Orders } from './entities/Orders';
import { Locker } from './entities/Locker';

dotenv.config();

export const AppDataSource = new DataSource({
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: 'public', // нейронка сказало надо 
  synchronize: false,
  logging: true,
  entities: [Cells, Users, Orders, Locker],
  migrations: [__dirname + './src/migrations/*.{ts,js}'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
