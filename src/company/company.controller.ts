import { Controller, Post, Body } from '@nestjs/common';
import { CompanyEntity } from './company.entity';
import { CompanyService } from './company.service';

@Controller('companies')
export class CompanyController {
	constructor(private readonly companyService: CompanyService) {}
	@Post('register')
	async registerUser(@Body('company') company): Promise<CompanyEntity> {
		return this.companyService.companyService(company);
	}
}
