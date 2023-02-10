import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameColumn1675702664177 implements MigrationInterface {
    name = 'AddNameColumn1675702664177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "full_name" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_name"`);
    }

}
