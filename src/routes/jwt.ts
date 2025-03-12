import { Router } from 'express';
import {
	registerUser,
	loginUser,
	getProfile,
	refreshToken,
	logoutUser,
} from '../controllers/jwt.controller';
import { authenticateToken } from '../middlewares/jwtMiddleware';

export const jwtRouter = Router();

jwtRouter.post('/register', registerUser);
jwtRouter.post('/login', loginUser);
jwtRouter.get('/profile', authenticateToken, getProfile);
jwtRouter.post('/refresh', refreshToken);
jwtRouter.post('/logout', logoutUser);
