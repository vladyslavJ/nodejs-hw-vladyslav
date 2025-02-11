// Гарантує типізацію змінних оточення

import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
	LOCAL_ENV: 'local',
	PROD_ENV: 'prod',
	LOG_PATH: process.env.LOG_PATH || 'logs/app.log',
} as const;