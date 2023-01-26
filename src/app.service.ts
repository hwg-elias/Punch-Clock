import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	getHello(): string {
		return 'Your in "Punch-Clock" projec by: Gabriel Elias!';
	}
}
