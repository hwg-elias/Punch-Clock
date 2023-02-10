import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddRolesAndHashingPasswordOfEntityUser1670438027732
	implements MigrationInterface
{
	name = 'AddRolesAndHashingPasswordOfEntityUser1670438027732';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" ADD "role" character varying NOT NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
	}
}
