import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from '@app/company/company.entity';
import { Request } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { env } from 'process';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CompanyService {
	constructor(
		@InjectRepository(CompanyEntity)
		private readonly companyRepository: Repository<CompanyEntity>,
	) {}
	async registerCompany(
		company: CompanyEntity,
		req: Request,
	): Promise<CompanyEntity> {
		const accountType = await this.accountType(req.headers.authorization);
		if (accountType != 'admin') {
			throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
		}
		const newCompany = await this.companyRepository.save(company);

		return newCompany;
	}

	async showAllCompanies() {
		return this.companyRepository.find({
			where: { activated: true },
			select: ['id', 'company_name', 'createdAt', 'employees_count', 'email'],
		});
	}

	async companyShow(id: number): Promise<CompanyEntity> {
		const company = await this.companyRepository.findOne({
			where: { id: id },
			select: [
				'id',
				'company_name',
				'email',
				'employees_count',
				'employees',
				'createdAt',
			],
		});
		if (!company) {
			throw new HttpException(
				'Company do not exist',
				HttpStatus.UNPROCESSABLE_ENTITY,
			);
		}
		return company;
	}

	async deactiveCompany(id: number) {
		const company = await this.companyRepository.findOne({
			where: { id },
			select: ['id', 'employees_count', 'email', 'activated', 'company_name'],
		});

		if (company.activated === true) {
			company.activated = false;
		} else {
			company.activated = true;
		}

		await this.companyRepository.save(company);
		return company;
	}

	async accountType(bearerToken: string): Promise<string> {
		const token = bearerToken.split(' ')[1];
		const decodedToken = verify(token, env.JWT_SECRET) as JwtPayload;

		return decodedToken.accountType;
	}
}
