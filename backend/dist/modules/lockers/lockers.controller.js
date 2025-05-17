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
exports.LockersController = void 0;
const common_1 = require("@nestjs/common");
const lockers_service_1 = require("./lockers.service");
const swagger_1 = require("@nestjs/swagger");
const createLocker_dto_1 = require("./dto/createLocker.dto");
const updateLocker_dto_1 = require("./dto/updateLocker.dto");
const lockers_1 = require("../../types/lockers");
let LockersController = class LockersController {
    constructor(lockersService) {
        this.lockersService = lockersService;
    }
    findAll() {
        return this.lockersService.findAll();
    }
    create(createLockerDto) {
        return this.lockersService.create(createLockerDto);
    }
    update(id, updateLockerDto) {
        return this.lockersService.update(id, updateLockerDto);
    }
    remove(id) {
        return this.lockersService.remove(id);
    }
};
exports.LockersController = LockersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, type: lockers_1.Lockers }),
    (0, swagger_1.ApiCookieAuth)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LockersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiProperty)({ type: createLocker_dto_1.CreateLockerDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        type: lockers_1.Lockers,
        example: {
            message: 'Locker is created',
            locker: { id: 1, total_cells: 5, location: 'Prague, Czechia,  000/0 Bubenská, 000 00' },
        },
    }),
    (0, swagger_1.ApiCookieAuth)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createLocker_dto_1.CreateLockerDto]),
    __metadata("design:returntype", void 0)
], LockersController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, swagger_1.ApiProperty)({ type: updateLocker_dto_1.UpdateLockerDto }),
    (0, swagger_1.ApiResponse)({ status: 200, type: createLocker_dto_1.CreateLockerDto }),
    (0, swagger_1.ApiCookieAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateLocker_dto_1.UpdateLockerDto]),
    __metadata("design:returntype", void 0)
], LockersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, swagger_1.ApiCookieAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], LockersController.prototype, "remove", null);
exports.LockersController = LockersController = __decorate([
    (0, common_1.Controller)('lockers'),
    __metadata("design:paramtypes", [lockers_service_1.LockersService])
], LockersController);
//# sourceMappingURL=lockers.controller.js.map