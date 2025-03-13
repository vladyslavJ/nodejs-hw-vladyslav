import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Item extends Model {
	public id!: number;
	public text!: string;
	public status!: string;
}

Item.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		text: {
			type: DataTypes.STRING(150),
			allowNull: false,
		},
		status: {
			type: DataTypes.STRING(150),
			allowNull: false,
			defaultValue: 'new',
		},
	},
	{
		sequelize,
		modelName: 'Item',
	}
);
