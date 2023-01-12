import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { PunchEntity } from './punch.entity';

@Injectable()
export class PunchService {
	constructor(
		@InjectRepository(PunchEntity)
		private readonly punchRepository: Repository<PunchEntity>,
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
	) {}
	async punchClock(currentUserId: number): Promise<PunchEntity> {
		const user = await this.userRepository.findOne({
			where: { id: currentUserId },
		});
		let statusPunch = 'punch-in';
		let hoursWorked;
		const lastPunchArray = await this.findLastPunch(user.id);

		if (lastPunchArray[0].status === 'punch-in') statusPunch = 'punch-out';

		console.log(hoursWorked);

		return await this.punchRepository.save({
			status: statusPunch,
			employee: user,
		});
	}

	async findLastPunch(id: number): Promise<PunchEntity[]> {
		const lastPunchArray = await this.punchRepository.find({
			where: {
				employee: {
					id,
				},
			},
			order: { createdAt: 'DESC' },
			take: 2,
		});

		return lastPunchArray;
	}
}
