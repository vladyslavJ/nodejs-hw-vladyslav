// Гарантує типізацію змінних оточення

import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
	LOCAL_ENV: 'local',
	PROD_ENV: 'prod',
	LOG_PATH: process.env.LOG_PATH || 'logs/app.log',
	APP_PORT: process.env.APP_PORT || 3000,
} as const;
