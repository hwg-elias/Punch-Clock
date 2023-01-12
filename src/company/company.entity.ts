import { UserEntity } from 'src/user/user.entity';
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

	@OneToMany(() => UserEntity, (user) => user.company)
	employees: UserEntity[];
}
