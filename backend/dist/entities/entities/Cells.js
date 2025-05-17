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
exports.Cells = void 0;
const typeorm_1 = require("typeorm");
const Locker_1 = require("./Locker");
const Orders_1 = require("./Orders");
const Users_1 = require("./Users");
let Cells = class Cells {
};
exports.Cells = Cells;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata("design:type", Number)
], Cells.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { name: 'cell_number', nullable: true }),
    __metadata("design:type", Number)
], Cells.prototype, "cellNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', {
        name: 'size',
        nullable: true,
        enum: ['studio', '1br', '2br', '3br', 'penthouse'],
    }),
    __metadata("design:type", String)
], Cells.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', {
        name: 'status',
        nullable: true,
        length: 20,
        default: () => "'free'",
    }),
    __metadata("design:type", String)
], Cells.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'reserved_until',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Cells.prototype, "reserved_until", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { name: 'order_id', nullable: true }),
    __metadata("design:type", Number)
], Cells.prototype, "order_id", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { name: 'worker_id', nullable: true }),
    __metadata("design:type", Number)
], Cells.prototype, "worker_id", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { name: 'locker_id', nullable: false }),
    __metadata("design:type", Number)
], Cells.prototype, "locker_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Locker_1.Locker, (locker) => locker.cells, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)([{ name: 'locker_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Locker_1.Locker)
], Cells.prototype, "locker", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Orders_1.Orders, (orders) => orders.cells, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)([{ name: 'order_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Orders_1.Orders)
], Cells.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.cells, { onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)([{ name: 'worker_id', referencedColumnName: 'id' }]),
    __metadata("design:type", Users_1.Users)
], Cells.prototype, "worker", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Orders_1.Orders, (orders) => orders.cell),
    __metadata("design:type", Array)
], Cells.prototype, "orders", void 0);
exports.Cells = Cells = __decorate([
    (0, typeorm_1.Index)('cells_pkey', ['id'], { unique: true }),
    (0, typeorm_1.Entity)('cells', { schema: 'public' })
], Cells);
//# sourceMappingURL=Cells.js.map