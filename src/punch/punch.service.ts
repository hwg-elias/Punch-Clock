import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@app/user/user.entity';
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

		if (lastPunchArray.length != 0 && lastPunchArray[0].status === 'punch-in') {
			statusPunch = 'punch-out';
			const punchIn = new Date() as any;
			const punchOut = lastPunchArray[0].createdAt as any;
			const difference = new Date(punchIn - punchOut);

			hoursWorked = difference.getUTCHours() + 'h ';
			hoursWorked += difference.getUTCMinutes() + 'm ';
			hoursWorked += difference.getUTCSeconds() + 's';
		}

		return await this.punchRepository.save({
			status: statusPunch,
			hoursWorked,
			employee: user,
		});
	}

	async showPunches(currentUserId: number): Promise<PunchEntity[]> {
		return await this.punchRepository.find({
			where: { employee: { id: currentUserId } },
			order: { createdAt: 'DESC' },
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
			take: 1,
		});

		return lastPunchArray;
	}
}
