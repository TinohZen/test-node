import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class Entity extends Model {
  declare id: number;
  declare name: string;
}

Entity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'entities',
  }
);
