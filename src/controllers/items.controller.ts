import { Request, Response } from 'express';
import { Item } from '../models/itemsModel.ts';

/* додати нові таски (POST /items) */
export const addItems = async (req: Request, res: Response) => {
	try {
		const newItem = await Item.create({
			text: req.body.text,
			status: 'new',
		});

		res.status(201).json(newItem);
	} catch (error) {
		res.status(500).json({ error: 'Помилка створення завдання' });
	}
};

/* переглянути всі таски (GET /items) */
export const reviewItems = async (req: Request, res: Response) => {
	try {
		const items = await Item.findAll();
		
		res.json(items);
	} catch (error) {
		res.status(500).json({ error: 'Помилка отримання даних' });
	}
};

/* змінити статус таска (PUT /items/:itemId) */
export const updateStatus = async (req: Request, res: Response) => {
	try {
		const { itemId } = req.params;
		const { status } = req.body;
		const item = await Item.findByPk(itemId, { raw: false });

		if (!item) {
			return res.status(404).json({ message: 'Завдання не знайдено' });
		}

		await item.update({ status });

		res.json({ message: 'Статус оновлено' });
	} catch (error) {
		res.status(500).json({ error: 'Помилка оновлення' });
	}
};

/* видалити таск (DELETE /items/:itemId) */
export const deleteItems = async (req: Request, res: Response) => {
	try {
		const { itemId } = req.params;
		const deletedCount = await Item.destroy({ where: { id: itemId } });

		if (deletedCount === 0)
			return res.status(404).json({ message: 'Завдання не знайдено' });

		res.json({ message: 'Завдання видалено' });
	} catch (error) {
		res.status(500).json({ error: 'Помилка видалення' });
	}
};
