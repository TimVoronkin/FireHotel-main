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
exports.Orders = void 0;
const typeorm_1 = require("typeorm");
const Cells_1 = require("./Cells");
const Locker_1 = require("./Locker");
let Orders = class Orders {
};
exports.Orders = Orders;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata("design:type", Number)
], Orders.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'order_uuid', nullable: true, unique: true }),
    __metadata("design:type", String)
], Orders.prototype, "orderUuid", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'email', nullable: false }),
    __metadata("design:type", String)
], Orders.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { name: 'cell_id', nullable: false }),
    __metadata("design:type", Number)
], Orders.prototype, "cell_id", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { name: 'locker_id', nullable: false }),
    __metadata("design:type", Number)
], Orders.prototype, "locker_id", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'date_from', nullable: false }),
    __metadata("design:type", Date)
], Orders.prototype, "DateFrom", void 0);
__decorate([
    (0, typeorm_1.Column)('date', { name: 'date_to', nullable: false }),
    __metadata("design:type", Date)
], Orders.prototype, "DateTo", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'name', nullable: false }),
    __metadata("design:type", String)
], Orders.prototype, "Name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'surname', nullable: false }),
    __metadata("design:type", String)
], Orders.prototype, "Surname", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Cells_1.Cells, (cells) => cells.order),
    __metadata("design:type", Array)
], Orders.prototype, "cells", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cells_1.Cells, (cells) => cells.orders, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)([{ name: 'cell_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Cells_1.Cells)
], Orders.prototype, "cell", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Locker_1.Locker, (locker) => locker.orders, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)([{ name: 'locker_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Locker_1.Locker)
], Orders.prototype, "locker", void 0);
exports.Orders = Orders = __decorate([
    (0, typeorm_1.Index)('orders_pkey', ['id'], { unique: true }),
    (0, typeorm_1.Index)('orders_order_uuid_key', ['orderUuid'], { unique: true }),
    (0, typeorm_1.Entity)('orders', { schema: 'public' })
], Orders);
//# sourceMappingURL=Orders.js.map