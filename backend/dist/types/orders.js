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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const swagger_1 = require("@nestjs/swagger");
class Order {
}
exports.Order = Order;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order ID', example: 1 }),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order Tracking ID', example: 'TFB-000001' }),
    __metadata("design:type", String)
], Order.prototype, "orderUuid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cell ID', example: 1 }),
    __metadata("design:type", Number)
], Order.prototype, "cell_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Locker ID', example: 1 }),
    __metadata("design:type", Number)
], Order.prototype, "locker_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date From', example: '2025-05-17' }),
    __metadata("design:type", String)
], Order.prototype, "DateFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date To', example: '2025-05-20' }),
    __metadata("design:type", String)
], Order.prototype, "DateTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name', example: 'Ivan' }),
    __metadata("design:type", String)
], Order.prototype, "Name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Surname', example: 'Ivanov' }),
    __metadata("design:type", String)
], Order.prototype, "Surname", void 0);
//# sourceMappingURL=orders.js.map