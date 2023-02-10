import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { join } from 'path';
dotenv.config();

export const config: PostgresConnectionOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [join(__dirname, '**', '*.entity.{ts,js}')],
	synchronize: false,
	migrations: [join(__dirname, '**', '/migrations/**/*{.ts,.js}')],
};

export const dataSource = new DataSource(config);
