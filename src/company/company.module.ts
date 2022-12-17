import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { CompanyController } from './company.controller';
import { CompanyEntity } from './company.entity';
import { CompanyService } from './company.service';

@Module({
	imports: [TypeOrmModule.forFeature([CompanyEntity, UserEntity])],
	controllers: [CompanyController],
	providers: [CompanyService],
})
export class CompanyModule {}
