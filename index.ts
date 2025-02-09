import dotenv from 'dotenv';
dotenv.config();
import Logger from './logger/logger.ts';
import PermissionException from './exceptions/PermissionsExceptions.ts';
import TypeException from './exceptions/TypeExceptions.ts';

const logger = new Logger();

logger.info('Info msg');
logger.warning('Warning msg');
logger.error(new PermissionException());
logger.error(new TypeException());
logger.error(new TypeError('By the way'));
