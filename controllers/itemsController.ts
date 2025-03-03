import { Request, Response } from 'express';
import { itemsModel } from '../models/itemsModel';

/* додати нові таски,  (POST /items) */
export const addItems = (req: Request, res: Response) => {
	const newItem = {
		id: itemsModel.length + 1,
		text: req.body.text,
		status: 'new',
	};

	itemsModel.push(newItem);
	res.status(201).send('Item added');
};

/* переглянути існуючі,  (GET /items) */
export const reviewItems = (req: Request, res: Response) => {
	res.json(itemsModel);
};

/* міняти статус (new/done)  (PUT /items/:itemId) */
export const updateStatus = (req: Request, res: Response) => {
	const { itemId } = req.params; // динамічні параметри шляху { itemId: "123" }
	const { status } = req.body;
	const item = itemsModel.find((item) => item.id === parseInt(itemId));

	if (item) {
		item.status = status;
		res.status(200).send('Status updated');
	} else {
		res.status(404).send('Item not found');
	}
};

/* видаляти таски (DELETE /items/:itemId) */
export const deleteItems = (req: Request, res: Response) => {
	const { itemId } = req.params;
	const index = itemsModel.findIndex((item) => item.id === parseInt(itemId));

	if (index !== -1) {
		itemsModel.splice(index, 1);
		res.status(200).send('Item deleted');
	} else {
		res.status(404).send('Item not found');
	}
};
