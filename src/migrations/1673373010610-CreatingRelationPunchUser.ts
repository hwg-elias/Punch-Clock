import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreatingRelationPunchUser1673373010610
	implements MigrationInterface
{
	name = 'CreatingRelationPunchUser1673373010610';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "punches" ADD "employeeId" integer`);
		await queryRunner.query(
			`ALTER TABLE "punches" ADD CONSTRAINT "FK_12565da8102324a318e3aff126e" FOREIGN KEY ("employeeId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "punches" DROP CONSTRAINT "FK_12565da8102324a318e3aff126e"`,
		);
		await queryRunner.query(`ALTER TABLE "punches" DROP COLUMN "employeeId"`);
	}
}
