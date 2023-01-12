import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'punches' })
export class PunchEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: Date;

	@Column()
	status: string;

	@ManyToOne(() => UserEntity, (user) => user.punches, {
		eager: true,
	})
	employee: UserEntity;
}
