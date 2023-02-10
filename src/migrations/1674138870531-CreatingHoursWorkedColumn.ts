import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreatingHoursWorkedColumn1674138870531
	implements MigrationInterface
{
	name = 'CreatingHoursWorkedColumn1674138870531';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "punches" ADD "hoursWorked" character varying`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "punches" DROP COLUMN "hoursWorked"`);
	}
}
