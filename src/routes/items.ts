import { Router } from 'express';
import Logger from '../../logger/logger.ts';
import {
	addItems,
	reviewItems,
	updateStatus,
	deleteItems,
} from '../controllers/items.controller.ts';
import {
	createItemSchema,
	updateItemSchema,
} from '../validators/item.validator.ts';

export const itemsRouter = Router();
const logger = new Logger();

itemsRouter
	.route('/')
	.post(createItemSchema, (req, res) => {
		addItems(req, res);
		logger.info('POST /items');
	})
	.get((req, res) => {
		reviewItems(req, res);
		logger.info('GET /items');
	});

itemsRouter
	.route('/:itemId')
	.put(updateItemSchema, (req, res) => {
		updateStatus(req, res);
		logger.info('PUT /items/:itemId');
	})
	.delete((req, res) => {
		deleteItems(req, res);
		logger.info('DELETE /items/:itemId');
	});
