import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldsToOrdersTable1715900000000 implements MigrationInterface {
    name = 'AddFieldsToOrdersTable1715900000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "date_from" date NOT NULL DEFAULT '2025-01-01'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "date_to" date NOT NULL DEFAULT '2025-01-02'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "name" text NOT NULL DEFAULT 'Unknown'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "surname" text NOT NULL DEFAULT 'Unknown'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "surname"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "date_to"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "date_from"`);
    }
}