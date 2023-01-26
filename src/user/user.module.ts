import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from './guards/auth.guard';
import { CompanyEntity } from '@app/company/company.entity';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, CompanyEntity])],
	controllers: [UserController],
	providers: [UserService, AuthGuard],
	exports: [UserService],
})
export class UserModule {}
