import { IsEmail, IsNotEmpty, Length } from 'class-validator';
export class CreateUserDto {
	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	@IsEmail()
	email: string;

	@IsNotEmpty()
	@Length(8, 16)
	password: string;

	@IsNotEmpty()
	company: any;
}
