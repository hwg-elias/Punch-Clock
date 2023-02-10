import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@app/user/decorators/user.decorator';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { PunchEntity } from '@app/punch/punch.entity';
import { PunchService } from '@app/punch/punch.service';

@Controller('punch')
export class PunchController {
	constructor(private readonly punchService: PunchService) {}
	@Post()
	@UseGuards(AuthGuard)
	async punchClock(@User('id') currentUserId: number): Promise<PunchEntity> {
		return await this.punchService.punchClock(currentUserId);
	}

	@Get('punches')
	@UseGuards(AuthGuard)
	async showPunches(@User('id') currentUserId: number): Promise<PunchEntity[]> {
		return await this.punchService.showPunches(currentUserId);
	}
}
