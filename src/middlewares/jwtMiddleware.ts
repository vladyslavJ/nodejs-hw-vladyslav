import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../../env.ts';

const ACCESS_SECRET = ENV.ACCESS_SECRET;

export const authenticateToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ message: 'Доступ заборонено' });
	}

	jwt.verify(token, ACCESS_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ message: 'Недійсний токен' });
		}

		req.userId = user.userId;
		next();
	});
};
