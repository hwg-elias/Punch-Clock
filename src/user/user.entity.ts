import {
	BeforeInsert,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { CompanyEntity } from '@app/company/company.entity';
import { PunchEntity } from '@app/punch/punch.entity';
import { deflate } from 'zlib';

@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column({ default: '' })
	full_name: string;

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

	@Column({ default: 'member' })
	accountType: string;

	@ManyToOne(() => CompanyEntity, (company) => company.employees, {
		eager: true,
	})
	company: CompanyEntity;

	@OneToMany(() => PunchEntity, (punch) => punch.employee)
	punches: PunchEntity[];

	@BeforeInsert()
	async hashPassword() {
		this.password = await hash(this.password, 10);
	}
}
