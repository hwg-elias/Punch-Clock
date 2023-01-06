import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/company/company.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { env } from 'process';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/loginUser.dto';
import { compare } from 'bcrypt';
import { UserResponseInterface } from './types/userResponse.interface';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		@InjectRepository(CompanyEntity)
		private readonly companyRepository: Repository<CompanyEntity>,
	) {}

	async registerUser(createUserDto: CreateUserDto): Promise<UserEntity> {
		const userByUsername = await this.userRepository.findOne({
			where: { username: createUserDto.username },
		});
		const userByEmail = await this.userRepository.findOne({
			where: { email: createUserDto.email },
		});

		if (userByEmail || userByUsername) {
			throw new HttpException(
				'Email or Username already in use',
				HttpStatus.UNPROCESSABLE_ENTITY,
			);
		}

		const companyById = await this.companyRepository.findOne({
			where: { id: createUserDto.company },
		});

		if (!companyById) {
			throw new HttpException(
				'The Company informed does not exist',
				HttpStatus.UNPROCESSABLE_ENTITY,
			);
		}

		createUserDto.company = companyById;

		const newUser = new UserEntity();
		Object.assign(newUser, createUserDto);

		companyById.employees_count++;

		await this.companyRepository.save(companyById);

		return await this.userRepository.save(newUser);
	}

	async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
		const user = await this.userRepository.findOne({
			where: {
				username: loginUserDto.username,
			},
			select: ['id', 'username', 'email', 'password', 'company', 'role'],
		});

		const isPasswordCorrect = await compare(
			loginUserDto.password,
			user.password,
		);

		if (!user || !isPasswordCorrect) {
			throw new HttpException(
				'Credentials are not valid',
				HttpStatus.UNPROCESSABLE_ENTITY,
			);
		}

		delete user.password;
		return user;
	}

	async currentUser(user: UserEntity) {
		return user;
	}

	async updateCurrentUser(
		currentUserId: number,
		updateUserDto: UpdateUserDto,
	): Promise<UserEntity> {
		const user = await this.findById(currentUserId);
		Object.assign(user, updateUserDto);
		return await this.userRepository.save(user);
	}

	async findById(id: number): Promise<UserEntity> {
		return this.userRepository.findOne({ where: { id } });
	}

	buildUserResponse(user: UserEntity): UserResponseInterface {
		return {
			user: {
				...user,
				token: this.generateJwt(user),
			},
		};
	}

	generateJwt(user: UserEntity): string {
		return sign(
			{
				id: user.id,
				username: user.username,
				email: user.email,
				role: user.role,
				company: user.company,
			},
			env.JWT_SECRET,
		);
	}
}
