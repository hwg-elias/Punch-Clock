import {
	Controller,
	Post,
	Body,
	Get,
	Patch,
	Param,
	UseGuards,
	Req,
} from '@nestjs/common';
import { CompanyEntity } from '@app/company/company.entity';
import { CompanyService } from '@app/company/company.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { Request } from 'express';

@Controller('companies')
export class CompanyController {
	constructor(private readonly companyService: CompanyService) {}

	@Post('register')
	@UseGuards(AuthGuard)
	async registerCompany(
		@Body('company') company,
		@Req() req: Request,
	): Promise<CompanyEntity> {
		return this.companyService.registerCompany(company, req);
	}

	@Get()
	async showAllCompanies() {
		return await this.companyService.showAllCompanies();
	}

	@Get(':id')
	async showSingleCompany(@Param('id') id: number): Promise<CompanyEntity> {
		return await this.companyService.companyShow(id);
	}

	@Patch(':id')
	@UseGuards(AuthGuard)
	async deactiveCompany(@Param('id') id: number): Promise<CompanyEntity> {
		return await this.companyService.deactiveCompany(id);
	}
}
