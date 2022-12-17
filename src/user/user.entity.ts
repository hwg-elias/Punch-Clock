import {
	BeforeInsert,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { CompanyEntity } from 'src/company/company.entity';

@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column({ default: '' })
	description: string;

	@Column({ select: false })
	password: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: Date;

	@Column()
	role: string;

	@ManyToOne(() => CompanyEntity, (company) => company.employees, {
		eager: true,
	})
	company: CompanyEntity;

	@BeforeInsert()
	async hashPassword() {
		this.password = await hash(this.password, 10);
	}
}
