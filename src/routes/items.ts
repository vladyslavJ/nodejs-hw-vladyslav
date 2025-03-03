import { Router } from 'express';
import Logger from '../../logger/logger.ts';
import {
	addItems,
	reviewItems,
	updateStatus,
	deleteItems,
} from '../../controllers/itemsController.ts';

export const itemsRouter = Router();
const logger = new Logger();

itemsRouter
	.route('/')
	.post((req, res) => {
		addItems(req, res);
		logger.info('POST /items');
	})
	.get((req, res) => {
		reviewItems(req, res);
		logger.info('GET /items');
	});

itemsRouter
	.route('/:itemId')
	.put((req, res) => {
		updateStatus(req, res);
		logger.info('PUT /items/:itemId');
	})
	.delete((req, res) => {
		deleteItems(req, res);
		logger.info('DELETE /items/:itemId');
	});
