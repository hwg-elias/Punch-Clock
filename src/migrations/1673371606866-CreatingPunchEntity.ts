import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreatingPunchEntity1673371606866
	implements MigrationInterface
{
	name = 'CreatingPunchEntity1673371606866';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "punches" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(),"updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, CONSTRAINT "PK_ebaa308a35cce0eeab51b314bd2" PRIMARY KEY ("id"))`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "punches"`);
	}
}
