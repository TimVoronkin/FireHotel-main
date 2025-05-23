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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const orders_dto_1 = require("./orders.dto");
const swagger_1 = require("@nestjs/swagger");
const orders_1 = require("../../types/orders");
let OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    findAll() {
        return this.ordersService.findAll();
    }
    create(order) {
        console.log('ORDER BODY IN CONTROLLER:', order);
        return this.ordersService.create(order);
    }
    update(order) {
        return this.ordersService.update(order);
    }
    delete(order) {
        return this.ordersService.delete({ orderUuid: order });
    }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiCookieAuth)(),
    (0, swagger_1.ApiResponse)({ status: 201, type: [orders_1.Order] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiCookieAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 201,
        example: { message: 'Order is created', order: { id: 1, orderUuid: 'TFB-000001', locker_id: 1, cell_id: 1 } },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [orders_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiCookieAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 201,
        example: { message: 'Order is updated', order: { id: 1, orderUuid: 'TFB-000001', locker_id: 1, cell_id: 1 } },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [orders_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(),
    (0, swagger_1.ApiCookieAuth)(),
    (0, swagger_1.ApiResponse)({ status: 201, example: { message: 'Order is deleted' } }),
    __param(0, (0, common_1.Query)('tn')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "delete", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map