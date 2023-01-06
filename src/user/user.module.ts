import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { CompanyEntity } from 'src/company/company.entity';
import { AuthGuard } from './guards/auth.guard';

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity, CompanyEntity])],
	controllers: [UserController],
	providers: [UserService, AuthGuard],
	exports: [UserService],
})
export class UserModule {}
