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
exports.LockersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Locker_1 = require("../../entities/entities/Locker");
const typeorm_2 = require("typeorm");
let LockersService = class LockersService {
    constructor(lockersRepository) {
        this.lockersRepository = lockersRepository;
    }
    async findAll() {
        return this.lockersRepository.find();
    }
    async create(createLockerDto) {
        const locker = this.lockersRepository.create(createLockerDto);
        if (locker !== null || locker !== undefined) {
            return await {
                message: 'Locker is created',
                locker: await this.lockersRepository.save(locker),
            };
        }
        else {
            return {
                message: 'Locker is already exist',
            };
        }
    }
    async update(id, updateLockerDto) {
        const locker = this.lockersRepository.create(updateLockerDto);
        const isExist = await this.lockersRepository.findOne({ where: { id: id } });
        if (isExist) {
            await this.lockersRepository.update({ id: id }, locker);
            return {
                message: 'Locker is updated',
            };
        }
        return {
            message: 'Locker is not exist',
        };
    }
    async remove(id) {
        const isExist = await this.lockersRepository.findOne({ where: { id: id } });
        if (isExist) {
            await this.lockersRepository.delete({ id: id });
            return {
                message: 'Locker is deleted',
            };
        }
        return {
            message: 'Locker is not exist',
        };
    }
};
exports.LockersService = LockersService;
exports.LockersService = LockersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Locker_1.Locker)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LockersService);
//# sourceMappingURL=lockers.service.js.map