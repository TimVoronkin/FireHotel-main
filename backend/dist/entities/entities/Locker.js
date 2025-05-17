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
exports.Locker = void 0;
const typeorm_1 = require("typeorm");
const Cells_1 = require("./Cells");
const Orders_1 = require("./Orders");
let Locker = class Locker {
};
exports.Locker = Locker;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint', name: 'id' }),
    __metadata("design:type", Number)
], Locker.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { name: 'total_cells' }),
    __metadata("design:type", Number)
], Locker.prototype, "total_cells", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'location' }),
    __metadata("design:type", String)
], Locker.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'name', nullable: false }),
    __metadata("design:type", String)
], Locker.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'description', nullable: true }),
    __metadata("design:type", String)
], Locker.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Cells_1.Cells, (cells) => cells.locker),
    __metadata("design:type", Array)
], Locker.prototype, "cells", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Orders_1.Orders, (orders) => orders.locker),
    __metadata("design:type", Array)
], Locker.prototype, "orders", void 0);
exports.Locker = Locker = __decorate([
    (0, typeorm_1.Index)('locker_pkey', ['id'], { unique: true }),
    (0, typeorm_1.Entity)('locker', { schema: 'public' })
], Locker);
//# sourceMappingURL=Locker.js.map