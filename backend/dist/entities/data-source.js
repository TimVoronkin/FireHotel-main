"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const Cells_1 = require("./entities/Cells");
const Users_1 = require("./entities/Users");
const Orders_1 = require("./entities/Orders");
const Locker_1 = require("./entities/Locker");
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: 'public',
    synchronize: false,
    logging: true,
    entities: [Cells_1.Cells, Users_1.Users, Orders_1.Orders, Locker_1.Locker],
    migrations: [__dirname + './src/migrations/*.{ts,js}'],
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.error('Error during Data Source initialization:', err);
});
//# sourceMappingURL=data-source.js.map