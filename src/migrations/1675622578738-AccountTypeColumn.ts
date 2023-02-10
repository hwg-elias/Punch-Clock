import { MigrationInterface, QueryRunner } from "typeorm";

export class AccountTypeColumn1675622578738 implements MigrationInterface {
    name = 'AccountTypeColumn1675622578738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "accountType" character varying NOT NULL DEFAULT 'member'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountType"`);
    }

}
