import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAndUpdatedAt1675123237423 implements MigrationInterface {
    name = 'AddCreatedAndUpdatedAt1675123237423'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "createdAt"`);
    }

}
