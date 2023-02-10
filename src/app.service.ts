import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHello(): string {
		return 'Your in "Punch-Clock" project by: Gabriel Elias!';
	}
}
