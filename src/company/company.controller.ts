import { Controller, Post, Body, Get } from '@nestjs/common';
import { CompanyEntity } from '@app/company/company.entity';
import { CompanyService } from '@app/company/company.service';

@Controller('companies')
export class CompanyController {
	constructor(private readonly companyService: CompanyService) {}
	@Post('register')
	async registerCompany(@Body('company') company): Promise<CompanyEntity> {
		return this.companyService.registerCompany(company);
	}

	@Get('/:id')
	async companyShow(id: number) {
		return await this.companyService.companyShow(id);
	}
}
