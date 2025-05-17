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
exports.CreateCelLDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCelLDto {
}
exports.CreateCelLDto = CreateCelLDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: 'cell number', example: 1, required: true }),
    __metadata("design:type", Number)
], CreateCelLDto.prototype, "cellNumber", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: 'locker id', example: 1, required: true }),
    __metadata("design:type", Number)
], CreateCelLDto.prototype, "locker_id", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['studio', '1br', '2br', '3br', 'penthouse']),
    (0, swagger_1.ApiProperty)({ description: 'cell size', example: 's', required: true }),
    __metadata("design:type", String)
], CreateCelLDto.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['free', 'reserved']),
    (0, swagger_1.ApiProperty)({ description: 'cell status', example: 'free', required: true }),
    __metadata("design:type", String)
], CreateCelLDto.prototype, "status", void 0);
//# sourceMappingURL=createCell.dto.js.map