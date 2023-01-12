import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { PunchController } from './punch.controller';
import { PunchEntity } from './punch.entity';
import { PunchService } from './punch.service';

@Module({
	imports: [TypeOrmModule.forFeature([PunchEntity, UserEntity])],
	controllers: [PunchController],
	providers: [PunchService],
	exports: [PunchService],
})
export class PunchModule {}
