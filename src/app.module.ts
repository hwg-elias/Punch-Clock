import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from './ormconfig';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';
import { AuthMiddleware } from './user/middlewares/auth.middleware';
import { PunchModule } from './punch/punch.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(config),
		UserModule,
		CompanyModule,
		PunchModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes({
			path: '*',
			method: RequestMethod.ALL,
		});
	}
}
