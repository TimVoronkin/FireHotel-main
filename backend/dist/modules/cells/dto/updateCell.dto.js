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
exports.UpdateCellDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateCellDto {
}
exports.UpdateCellDto = UpdateCellDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'cell number', example: 1, required: false }),
    __metadata("design:type", Number)
], UpdateCellDto.prototype, "cell_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'locker id', example: 1, required: false }),
    __metadata("design:type", Number)
], UpdateCellDto.prototype, "locker_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['studio', '1br', '2br', '3br', 'penthouse']),
    (0, swagger_1.ApiProperty)({ description: 'cell size', example: 's', required: false }),
    __metadata("design:type", String)
], UpdateCellDto.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['free', 'reserved']),
    (0, swagger_1.ApiProperty)({ description: 'cell status', example: 'free', required: false }),
    __metadata("design:type", String)
], UpdateCellDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'cell reserved until', example: '2022-01-01T10:30:00', required: false }),
    __metadata("design:type", Date)
], UpdateCellDto.prototype, "reserved_until", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'order id', example: 1, required: false }),
    __metadata("design:type", Number)
], UpdateCellDto.prototype, "order_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'worker id', example: 1, required: false }),
    __metadata("design:type", Number)
], UpdateCellDto.prototype, "worker_id", void 0);
//# sourceMappingURL=updateCell.dto.js.map