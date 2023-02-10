import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreatingRelationshipUserToCompany1670527357801
	implements MigrationInterface
{
	name = 'CreatingRelationshipUserToCompany1670527357801';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "company" TO "companyId"`,
		);
		await queryRunner.query(
			`CREATE TABLE "companies" ("id" SERIAL NOT NULL, "company_name" character varying NOT NULL, "employees_count" integer NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "companyId"`);
		await queryRunner.query(`ALTER TABLE "users" ADD "companyId" integer`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "FK_6f9395c9037632a31107c8a9e58" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "FK_6f9395c9037632a31107c8a9e58"`,
		);
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "companyId"`);
		await queryRunner.query(
			`ALTER TABLE "users" ADD "companyId" character varying NOT NULL`,
		);
		await queryRunner.query(`DROP TABLE "companies"`);
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "companyId" TO "company"`,
		);
	}
}
