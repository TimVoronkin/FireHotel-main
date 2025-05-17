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
exports.Lockers = void 0;
const swagger_1 = require("@nestjs/swagger");
class Lockers {
}
exports.Lockers = Lockers;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Locker id', example: 1, required: true }),
    __metadata("design:type", Number)
], Lockers.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total cells', example: 5, required: true }),
    __metadata("design:type", Number)
], Lockers.prototype, "total_cells", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Location', example: 'Prague, Czechia', required: true }),
    __metadata("design:type", String)
], Lockers.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Name of the locker', example: 'Main Branch', required: true }),
    __metadata("design:type", String)
], Lockers.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Description of the locker', example: 'Main branch locker', required: false }),
    __metadata("design:type", String)
], Lockers.prototype, "description", void 0);
//# sourceMappingURL=lockers.js.map