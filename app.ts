import { itemsRouter } from './src/routes/items.ts';
import { jwtRouter } from './src/routes/jwt.ts';
import { router } from './src/routes/index.ts';
import cookieParser from 'cookie-parser';
import { ENV } from './env.ts';
import express from 'express';

const APP_PORT = ENV.APP_PORT;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', router);
app.use('/items', itemsRouter);
app.use('/auth', jwtRouter);

app.use((req, res, next) => {
	res.status(404).send('Not Found');
});

app.listen(APP_PORT, () => {
	console.log(`Server is running on http://localhost:${APP_PORT}`);
});
