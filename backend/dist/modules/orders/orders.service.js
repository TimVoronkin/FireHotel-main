"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Orders_1 = require("../../entities/entities/Orders");
const typeorm_2 = require("typeorm");
const Locker_1 = require("../../entities/entities/Locker");
const Cells_1 = require("../../entities/entities/Cells");
const trackNumberGenerator_1 = require("../../common/trackNumberGenerator");
let OrdersService = class OrdersService {
    constructor(ordersRepository, lockersRepository, cellsRepository) {
        this.ordersRepository = ordersRepository;
        this.lockersRepository = lockersRepository;
        this.cellsRepository = cellsRepository;
    }
    findAll() {
        return this.ordersRepository.find();
    }
    findByOrderUuid(orderUuid) {
        return this.ordersRepository.findOne({ where: { orderUuid: orderUuid } });
    }
    async create(createOrderDto) {
        const generator = new trackNumberGenerator_1.TrackNumberGenerator();
        const lockerIsExist = await this.lockersRepository.findOne({ where: { id: createOrderDto.locker_id } });
        const cellIsExistAndFree = await this.cellsRepository.findOne({
            where: { id: createOrderDto.cell_id, status: 'free', locker: { id: createOrderDto.locker_id } },
        });
        const reservedUntil = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
        const orderUuid = generator.generate();
        if (lockerIsExist && cellIsExistAndFree) {
            const order = await this.ordersRepository.save({
                orderUuid: orderUuid,
                cell: cellIsExistAndFree,
                locker: lockerIsExist,
                email: createOrderDto.email,
            });
            const complectedOrder = {
                id: order.id,
                orderUuid: order.orderUuid,
                locker_id: order.locker.id,
                cell_id: order.cell_id,
            };
            await this.cellsRepository.update({ id: createOrderDto.cell_id }, { status: 'reserved', order: order, reserved_until: reservedUntil, worker: { id: createOrderDto.worker_id } });
            return {
                message: 'Order is created',
                order: complectedOrder,
            };
        }
        throw new common_1.HttpException('Locker or cell is not exist or cell is not free', 400);
    }
    async update(updateOrderDto) {
        const orderIsExist = await this.ordersRepository.findOne({ where: { orderUuid: updateOrderDto.orderUuid } });
        if (orderIsExist !== null) {
            const complectedOrder = {
                id: orderIsExist.id,
                orderUuid: orderIsExist.orderUuid,
                locker_id: orderIsExist.locker_id,
                cell_id: orderIsExist.cell_id,
                email: orderIsExist.email,
            };
            await this.ordersRepository.update({ orderUuid: updateOrderDto.orderUuid }, updateOrderDto);
            return {
                message: 'Order is updated',
                order: complectedOrder,
            };
        }
        throw new common_1.HttpException('Order is not exist', 400);
    }
    async delete(delteOrderDto) {
        const orderIsExist = await this.ordersRepository.findOne({ where: { orderUuid: delteOrderDto.orderUuid } });
        if (orderIsExist !== null) {
            await this.ordersRepository.delete({ orderUuid: delteOrderDto.orderUuid });
            await this.cellsRepository.update({ id: orderIsExist.cell_id }, { status: 'free', worker_id: null, reserved_until: null });
            return {
                message: 'Order is deleted',
            };
        }
        throw new common_1.HttpException('Order is not exist', 400);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Orders_1.Orders)),
    __param(1, (0, typeorm_1.InjectRepository)(Locker_1.Locker)),
    __param(2, (0, typeorm_1.InjectRepository)(Cells_1.Cells)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrdersService);
//# sourceMappingURL=orders.service.js.map