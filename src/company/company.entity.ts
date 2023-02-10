import { UserEntity } from '@app/user/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'companies' })
export class CompanyEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	company_name: string;

	@Column({ select: false, default: 0 })
	employees_count: number;

	@Column()
	email: string;

	@Column({ select: false, default: true })
	activated: boolean;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: Date;

	@OneToMany(() => UserEntity, (user) => user.company)
	employees: UserEntity[];
}
