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
exports.Cell = void 0;
const swagger_1 = require("@nestjs/swagger");
class Cell {
}
exports.Cell = Cell;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cell id', example: 1, required: true }),
    __metadata("design:type", Number)
], Cell.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cell number', example: 1, required: true }),
    __metadata("design:type", Number)
], Cell.prototype, "cell_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Locker id', example: 1, required: true }),
    __metadata("design:type", Number)
], Cell.prototype, "locker_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cell size', example: 's', required: true }),
    __metadata("design:type", String)
], Cell.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cell status', example: 'free', required: true }),
    __metadata("design:type", String)
], Cell.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cell reserved until', example: '2022-01-01T10:30:00', required: false }),
    __metadata("design:type", Date)
], Cell.prototype, "reserved_until", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order id', example: 1, required: false }),
    __metadata("design:type", Number)
], Cell.prototype, "order_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Worker id', example: 1, required: false }),
    __metadata("design:type", Number)
], Cell.prototype, "worker_id", void 0);
//# sourceMappingURL=cells.js.map