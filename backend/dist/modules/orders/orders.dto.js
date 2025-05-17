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
exports.DeleteOrderDto = exports.UpdateOrderDto = exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const isTrackNumber_1 = require("../../common/isTrackNumber");
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({ description: 'Email', example: 'john@example.com', required: true }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: 'Cell id', example: 1, required: true }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "cell_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: 'Locker id', example: 1, required: true }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "locker_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: 'Worker id', example: 1, required: true }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "worker_id", void 0);
class UpdateOrderDto {
}
exports.UpdateOrderDto = UpdateOrderDto;
__decorate([
    (0, class_validator_1.Validate)(isTrackNumber_1.IsTrackNumber),
    (0, swagger_1.ApiProperty)({ description: 'Tracking number', example: 'TFB-000001', required: true }),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "orderUuid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cell id', example: 1, required: false }),
    __metadata("design:type", Number)
], UpdateOrderDto.prototype, "cell_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email', example: 'john@example.com', required: false }),
    __metadata("design:type", String)
], UpdateOrderDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Locker id', example: 1, required: false }),
    __metadata("design:type", Number)
], UpdateOrderDto.prototype, "locker_id", void 0);
class DeleteOrderDto {
}
exports.DeleteOrderDto = DeleteOrderDto;
__decorate([
    (0, class_validator_1.Validate)(isTrackNumber_1.IsTrackNumber),
    (0, swagger_1.ApiProperty)({ description: 'Tracking number', example: 'TFB-000001', required: true }),
    __metadata("design:type", String)
], DeleteOrderDto.prototype, "orderUuid", void 0);
//# sourceMappingURL=orders.dto.js.map