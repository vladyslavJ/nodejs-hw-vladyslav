import dotenv from 'dotenv';
dotenv.config();
import Logger from './logger/logger.ts';

const logger = new Logger();

logger.info('Hello World');