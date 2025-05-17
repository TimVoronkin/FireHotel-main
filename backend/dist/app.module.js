"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const Users_1 = require("./entities/entities/Users");
const users_module_1 = require("./modules/users/users.module");
const Cells_1 = require("./entities/entities/Cells");
const Locker_1 = require("./entities/entities/Locker");
const Orders_1 = require("./entities/entities/Orders");
const auth_module_1 = require("./modules/auth/auth.module");
const orders_module_1 = require("./modules/orders/orders.module");
const cells_module_1 = require("./modules/cells/cells.module");
const lockers_module_1 = require("./modules/lockers/lockers.module");
const config_controller_1 = require("./modules/config/config.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DB_URL,
                entities: [Users_1.Users, Cells_1.Cells, Locker_1.Locker, Orders_1.Orders],
                synchronize: true,
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            orders_module_1.OrdersModule,
            cells_module_1.CellsModule,
            lockers_module_1.LockersModule,
        ],
        controllers: [config_controller_1.ConfigController],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map