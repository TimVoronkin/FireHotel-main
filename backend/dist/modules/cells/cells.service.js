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
exports.CellsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Cells_1 = require("../../entities/entities/Cells");
const typeorm_2 = require("typeorm");
const Locker_1 = require("../../entities/entities/Locker");
let CellsService = class CellsService {
    constructor(cellsRepository, lockersRepository) {
        this.cellsRepository = cellsRepository;
        this.lockersRepository = lockersRepository;
    }
    async findAll() {
        return this.cellsRepository.find();
    }
    async create(createCellDto) {
        const cell = this.cellsRepository.create(createCellDto);
        const lockerIsExist = await this.lockersRepository.findOne({ where: { id: createCellDto.locker_id } });
        const isExist = await this.cellsRepository.findOne({
            where: { cellNumber: createCellDto.cellNumber, locker: { id: createCellDto.locker_id } },
        });
        if (!isExist && lockerIsExist) {
            cell.locker = lockerIsExist;
            return {
                message: 'Cell is created',
                cell: await this.cellsRepository.save(cell),
            };
        }
        return {
            message: 'Cell is already exist or locker is not exist',
        };
    }
    async update(id, updateCellDto) {
        const cell = this.cellsRepository.create(updateCellDto);
        const isExist = await this.cellsRepository.findOne({ where: { id: id } });
        if (isExist) {
            await this.cellsRepository.update({ id: id }, cell);
            return {
                message: 'Cell is updated',
            };
        }
        return {
            message: 'Cell is not exist',
        };
    }
    async remove(id) {
        const isExist = await this.cellsRepository.findOne({ where: { id: id } });
        if (isExist) {
            await this.cellsRepository.delete({ id: id });
            return {
                message: 'Cell is deleted',
            };
        }
        return {
            message: 'Cell is not exist',
        };
    }
};
exports.CellsService = CellsService;
exports.CellsService = CellsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Cells_1.Cells)),
    __param(1, (0, typeorm_1.InjectRepository)(Locker_1.Locker)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CellsService);
//# sourceMappingURL=cells.service.js.map