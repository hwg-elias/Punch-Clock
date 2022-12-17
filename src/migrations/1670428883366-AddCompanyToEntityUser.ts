import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompanyToEntityUser1670428883366 implements MigrationInterface {
	name = 'AddCompanyToEntityUser1670428883366';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" ADD "company" character varying NOT NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "company"`);
	}
}
