// Гарантує типізацію змінних оточення

import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
	LOCAL_ENV: process.env.APP_ENV || 'local',
	PROD_ENV: process.env.PROD_ENV || 'prod',
	LOG_PATH: process.env.LOG_PATH || 'logs/app.log',
	APP_PORT: process.env.APP_PORT || 3000,
	ACCESS_SECRET: process.env.ACCESS_SECRET || 'access-secret',
	REFRESH_SECRET: process.env.REFRESH_SECRET || 'refresh-secret',
	DB_NAME: process.env.DB_NAME || 'db',
	DB_USER: process.env.DB_USER || 'postgres',
	DB_PASSWORD: process.env.DB_PASSWORD || 'pass',
	DB_HOST: process.env.DB_HOST || 'localhost',
} as const;
