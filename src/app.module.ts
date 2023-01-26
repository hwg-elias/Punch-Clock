import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { UserModule } from '@app/user/user.module';
import { CompanyModule } from '@app/company/company.module';
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';
import { PunchModule } from '@app/punch/punch.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '@app/ormconfig';

@Module({
	imports: [
		UserModule,
		CompanyModule,
		PunchModule,
		TypeOrmModule.forRoot(config),
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
