import { Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/user/decorators/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { PunchEntity } from './punch.entity';
import { PunchService } from './punch.service';

@Controller('punch')
export class PunchController {
	constructor(private readonly punchService: PunchService) {}
	@Post()
	@UseGuards(AuthGuard)
	async punchClock(@User('id') currentUserId: number): Promise<PunchEntity> {
		return this.punchService.punchClock(currentUserId);
	}
}
