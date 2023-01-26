import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from '@app/company/company.entity';

@Injectable()
export class CompanyService {
	constructor(
		@InjectRepository(CompanyEntity)
		private readonly companyRepository: Repository<CompanyEntity>,
	) {}
	async registerCompany(company: CompanyEntity): Promise<CompanyEntity> {
		return await this.companyRepository.save(company);
	}

	async companyShow(id: number) {
		return await this.companyRepository.findOne({ where: { id } });
	}
}
