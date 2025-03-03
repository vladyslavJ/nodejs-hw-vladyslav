import { Router } from 'express';

export const router = Router();

router.all('/', (req, res) => {
	res.send('Main Page');
});
