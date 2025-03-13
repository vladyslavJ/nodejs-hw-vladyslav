import { Sequelize } from 'sequelize';
import { ENV } from '../../env.ts';

export const sequelize = new Sequelize(
	ENV.DB_NAME,
	ENV.DB_USER,
	ENV.DB_PASSWORD,
	{
		host: ENV.DB_HOST,
		dialect: 'postgres',
		logging: false,
	}
);

export const connectDB = async () => {
	try {
		await sequelize.authenticate();
		console.log('PostgreSQL підключено!');
		await sequelize.sync({ alter: true });
		console.log('Таблиці синхронізовані!');
	} catch (error) {
		console.error('Помилка підключення до БД:', error);
	}
};
