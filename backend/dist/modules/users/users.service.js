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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Users_1 = require("../../entities/entities/Users");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
let UsersService = class UsersService {
    constructor(usersRepository, configService) {
        this.usersRepository = usersRepository;
        this.configService = configService;
    }
    findAll() {
        return this.usersRepository.find();
    }
    findByUsername(username) {
        const user = this.usersRepository.findOne({ where: { username } });
        return user;
    }
    async createUser(createUserDto) {
        const user = this.usersRepository.create(createUserDto);
        try {
            const isExist = await this.usersRepository.exists({ where: { username: user.username } });
            if (isExist) {
                return {
                    message: `User ${user.username} already exists`,
                };
            }
            user.uuid = (0, uuid_1.v4)();
            user.password = await bcrypt.hash(user.password, Number(this.configService.get('SALT_ROUNDS')));
            await this.usersRepository.save(user);
            return {
                message: `User ${user.username} created successfully`,
            };
        }
        catch (e) {
            console.warn(e);
            throw new common_1.HttpException(`User ${user.username} failed to create (email, phone, username already exist)`, 400);
        }
    }
    async updateUser(updateUserDto) {
        const user = this.usersRepository.create(updateUserDto);
        const isExist = await this.usersRepository.exists({ where: { username: user.username } });
        if (!isExist) {
            return {
                message: `User ${user.username} does not exist`,
            };
        }
        if (user.password) {
            user.password = await bcrypt.hash(user.password, Number(this.configService.get('SALT_ROUNDS')));
        }
        this.usersRepository.update({ username: user.username }, user);
        return {
            message: `User ${user.username} updated successfully`,
        };
    }
    async deleteUser(deleteUserDto) {
        const isExist = await this.usersRepository.exists({ where: { id: deleteUserDto.id } });
        if (!isExist) {
            return {
                message: `User with id ${deleteUserDto.id} does not exist`,
            };
        }
        this.usersRepository.delete({ id: deleteUserDto.id });
        return {
            message: `User with id ${deleteUserDto.id} deleted successfully`,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Users_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map