import { MigrationInterface, QueryRunner } from 'typeorm';

// passsword is 12345678

export default class AddRolesAndHashingPasswordOfEntityUser1670438027732
	implements MigrationInterface
{
	name = 'Seeds1670527357802';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`INSERT INTO companies (company_name, email, employees_count) VALUES ('Sudden Enterprise', 'enterprise@sudden.com', 1), ('Some Company Name', 'some@companyemail.com', 1), ('Saturn Devs', 'devils@saturn.com', 2) `,
		);
		await queryRunner.query(
			`INSERT INTO users (username, full_name, email, password, "companyId", role, "accountType") VALUES ( 'rogerspike', 'Roger Wheel Spike', 'wheelspike@gmail.com', '$2b$10$89m6kNoBO/kn4NxSNzU/Se1Idc6Vi5xnROxNbu0jik5HmYgLkpXNu', 1, 'manager', 'manager'), ('revorvi', 'Reginald Vorvi', 'vortei@gmail.com', '$2b$10$89m6kNoBO/kn4NxSNzU/Se1Idc6Vi5xnROxNbu0jik5HmYgLkpXNu', 2, 'janitor', 'manager'), ('gutoxd', 'Augusto Bernardes', 'gutolipo@gmail.com', '$2b$10$89m6kNoBO/kn4NxSNzU/Se1Idc6Vi5xnROxNbu0jik5HmYgLkpXNu', 3, 'developer', 'member'), ('helayas', 'Gabriel Elias da Silva', 'helayaswilson@gmail.com', '$2b$10$89m6kNoBO/kn4NxSNzU/Se1Idc6Vi5xnROxNbu0jik5HmYgLkpXNu', '3', 'manager', 'admin')`,
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public async down(): Promise<void> {}
}
