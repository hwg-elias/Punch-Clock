import { IsEmail, Length } from 'class-validator';

export class UpdateUserDto {
	readonly username: string;

	@IsEmail()
	readonly email: string;

	@Length(8, 16)
	readonly password: string;

	readonly description: string;

	readonly role: string;
}
