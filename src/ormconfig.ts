import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';
dotenv.config();

export const config: PostgresConnectionOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [__dirname + '/**/*.entity{.ts,.js}'],
	synchronize: false,
	migrations: ['src/migrations/**/*{.ts,.js}'],
};
const AppDataSource = new DataSource(config);

export default AppDataSource;
