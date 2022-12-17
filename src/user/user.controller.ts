import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ExpressRequest } from 'src/types/expressRequest.interface';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthGuard } from './guards/auth.guard';
import { UserResponseInterface } from './types/userResponse.interface';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}
	@Post('register')
	@UsePipes(new ValidationPipe())
	async registerUser(
		@Body('user') createUserDto: CreateUserDto,
	): Promise<UserResponseInterface> {
		const user = await this.userService.registerUser(createUserDto);
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
}
