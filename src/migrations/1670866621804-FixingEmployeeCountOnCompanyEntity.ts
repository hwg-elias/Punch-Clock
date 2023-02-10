import { MigrationInterface, QueryRunner } from 'typeorm';

export default class FixingEmployeeCountOnCompanyEntity1670866621804
	implements MigrationInterface
{
	name = 'FixingEmployeeCountOnCompanyEntity1670866621804';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "companies" ALTER COLUMN "employees_count" SET DEFAULT '0'`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "companies" ALTER COLUMN "employees_count" DROP DEFAULT`,
		);
	}
}
