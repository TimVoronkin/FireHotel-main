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
exports.CellsController = void 0;
const common_1 = require("@nestjs/common");
const cells_service_1 = require("./cells.service");
const swagger_1 = require("@nestjs/swagger");
const createCell_dto_1 = require("./dto/createCell.dto");
const updateCell_dto_1 = require("./dto/updateCell.dto");
const cells_1 = require("../../types/cells");
let CellsController = class CellsController {
    constructor(cellsService) {
        this.cellsService = cellsService;
    }
    async findAll() {
        return this.cellsService.findAll();
    }
    async create(createCellDto) {
        return this.cellsService.create(createCellDto);
    }
    async update(id, updateCellDto) {
        return this.cellsService.update(id, updateCellDto);
    }
    async remove(id) {
        return this.cellsService.remove(id);
    }
};
exports.CellsController = CellsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ type: [cells_1.Cell] }),
    (0, swagger_1.ApiCookieAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CellsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiProperty)({ type: createCell_dto_1.CreateCelLDto }),
    (0, swagger_1.ApiResponse)({ type: cells_1.Cell }),
    (0, swagger_1.ApiCookieAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCell_dto_1.CreateCelLDto]),
    __metadata("design:returntype", Promise)
], CellsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiProperty)({ type: updateCell_dto_1.UpdateCellDto }),
    (0, swagger_1.ApiCookieAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateCell_dto_1.UpdateCellDto]),
    __metadata("design:returntype", Promise)
], CellsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiCookieAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CellsController.prototype, "remove", null);
exports.CellsController = CellsController = __decorate([
    (0, common_1.Controller)('cells'),
    __metadata("design:paramtypes", [cells_service_1.CellsService])
], CellsController);
//# sourceMappingURL=cells.controller.js.map