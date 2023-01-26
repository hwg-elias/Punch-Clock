import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/user/user.entity';
import { CompanyController } from '@app/company/company.controller';
import { CompanyEntity } from '@app/company/company.entity';
import { CompanyService } from '@app/company/company.service';

@Module({
	imports: [TypeOrmModule.forFeature([CompanyEntity, UserEntity])],
	controllers: [CompanyController],
	providers: [CompanyService],
	exports: [CompanyService],
})
export class CompanyModule {}
