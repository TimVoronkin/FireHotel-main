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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const Cells_1 = require("./Cells");
let Users = class Users {
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'id' }),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'uuid', nullable: true, unique: true }),
    __metadata("design:type", String)
], Users.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'name', nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'last_name', nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'email', nullable: true, unique: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'phone', nullable: true, unique: true }),
    __metadata("design:type", String)
], Users.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'username', nullable: true, unique: true }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { name: 'role', enum: ['worker', 'admin'], default: 'worker' }),
    __metadata("design:type", String)
], Users.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'password', nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Cells_1.Cells, (cells) => cells.worker),
    __metadata("design:type", Array)
], Users.prototype, "cells", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Index)('users_email_key', ['email'], { unique: true }),
    (0, typeorm_1.Index)('users_pkey', ['id'], { unique: true }),
    (0, typeorm_1.Index)('users_phone_key', ['phone'], { unique: true }),
    (0, typeorm_1.Index)('users_username_key', ['username'], { unique: true }),
    (0, typeorm_1.Index)('users_uuid_key', ['uuid'], { unique: true }),
    (0, typeorm_1.Entity)('users', { schema: 'public' })
], Users);
//# sourceMappingURL=Users.js.map