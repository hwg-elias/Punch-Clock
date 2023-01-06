import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExpressRequest } from 'src/types/expressRequest.interface';

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest<ExpressRequest>();
		console.log('ABOUT TO PASS TO AUTHGUARD REQ.USER');
		if (req.user) {
			console.log('PASS IT');
			return true;
		}
		console.log('DO NOT PASS IT');
		throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
	}
}
