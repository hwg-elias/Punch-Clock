import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from './company.entity';

@Injectable()
export class CompanyService {
	constructor(
		@InjectRepository(CompanyEntity)
		private readonly companyRepository: Repository<CompanyEntity>,
	) {}
	async companyService(company: CompanyEntity): Promise<CompanyEntity> {
		return await this.companyRepository.save(company);
	}
}
