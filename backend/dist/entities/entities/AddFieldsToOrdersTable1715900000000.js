"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFieldsToOrdersTable1715900000000 = void 0;
class AddFieldsToOrdersTable1715900000000 {
    constructor() {
        this.name = 'AddFieldsToOrdersTable1715900000000';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" ADD "date_from" date NOT NULL DEFAULT '2025-01-01'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "date_to" date NOT NULL DEFAULT '2025-01-02'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "name" text NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "surname" text NOT NULL DEFAULT 'Unknown'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "surname"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "date_to"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "date_from"`);
    }
}
exports.AddFieldsToOrdersTable1715900000000 = AddFieldsToOrdersTable1715900000000;
//# sourceMappingURL=AddFieldsToOrdersTable1715900000000.js.map