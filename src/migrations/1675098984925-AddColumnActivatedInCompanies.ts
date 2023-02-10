import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnActivatedInCompanies1675098984925
	implements MigrationInterface
{
	name = 'AddColumnActivatedInCompanies1675098984925';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "companies" ADD "activated" boolean NOT NULL DEFAULT true`,
		);
		await queryRunner.query(
			`ALTER TABLE "punches" ALTER COLUMN "hoursWorked" SET NOT NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE "punches" ALTER COLUMN "hoursWorked" SET DEFAULT ''`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "punches" ALTER COLUMN "hoursWorked" DROP DEFAULT`,
		);
		await queryRunner.query(
			`ALTER TABLE "punches" ALTER COLUMN "hoursWorked" DROP NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "activated"`);
	}
}
