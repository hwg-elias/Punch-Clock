import {
	Body,
	Controller,
	Get,
	Post,
	Put,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ExpressRequest } from '@app/types/expressRequest.interface';
import { User } from './decorators/user.decorator';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}
	@Post('register')
	@UsePipes(new ValidationPipe())
	@UseGuards(AuthGuard)
	async registerUser(
		@Body('user') createUserDto: CreateUserDto,
		@Req() req: Request,
	): Promise<UserResponseInterface> {
		const user = await this.userService.registerUser(createUserDto, req);
		return this.userService.buildUserResponse(user);
	}

	@Post('login')
	@UsePipes(new ValidationPipe())
	async loginUser(
		@Body('user') loginUserDto: LoginUserDto,
	): Promise<UserResponseInterface> {
		const user = await this.userService.loginUser(loginUserDto);
		return this.userService.buildUserResponse(user);
	}

	@Get('user')
	@UseGuards(AuthGuard)
	async currentUser(
		@Req() req: ExpressRequest,
	): Promise<UserResponseInterface> {
		return this.userService.buildUserResponse(req.user);
	}

	@Put('user')
	@UseGuards(AuthGuard)
	async updateCurrentUser(
		@User('id') currentUserId: number,
		@Body('user') updateUserDto: UpdateUserDto,
	): Promise<UserResponseInterface> {
		const user = await this.userService.updateCurrentUser(
			currentUserId,
			updateUserDto,
		);
		return this.userService.buildUserResponse(user);
	}
}
