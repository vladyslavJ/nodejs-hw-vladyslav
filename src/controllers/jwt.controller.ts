import jwt from 'jsonwebtoken';
import { usersModel, User } from '../models/usersModel.ts';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { ENV } from '../../env.ts';

const ACCESS_SECRET = ENV.ACCESS_SECRET;
const REFRESH_SECRET = ENV.REFRESH_SECRET;

const AccessToken = (userId: number) => {
	return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: '15m' });
};

const RefreshToken = (userId: number) => {
	return jwt.sign({ userId }, REFRESH_SECRET, { expiresIn: '7d' });
};

export const registerUser = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;
	if (usersModel.some((user) => user.email === email)) {
		return res.status(400).json({ message: 'Користувач вже існує' });
	}

	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser: User = { name, email, password: hashedPassword };
	usersModel.push(newUser);

	res.status(201).json({ message: 'Користувач зареєстрований' });
};

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	const user = usersModel.find((u) => u.email === email);

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return res.status(401).json({ message: 'Невірний email або пароль' });
	}

	const userId = usersModel.indexOf(user);
	const accessToken = AccessToken(userId);
	const refreshToken = RefreshToken(userId);

	res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });
	res.json({ accessToken });
};

export const getProfile = (req: Request, res: Response) => {
	const userId = (req as any).userId;
	const user = usersModel[userId];

	if (!user) {
		return res.status(404).json({ message: 'Користувач не знайдений' });
	}

	res.json({ name: user.name, email: user.email });
};

export const refreshToken = (req: Request, res: Response) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken)
		return res.status(401).json({ message: 'Немає Refresh Token' });

	jwt.verify(refreshToken, REFRESH_SECRET, (err, user) => {
		if (err)
			return res.status(403).json({ message: 'Недійсний Refresh Token' });

		const newAccessToken = AccessToken((user as any).userId);
		res.json({ accessToken: newAccessToken });
	});
};

export const logoutUser = (req: Request, res: Response) => {
	res.clearCookie('refreshToken');
	res.json({ message: 'Вихід успішний' });
};
