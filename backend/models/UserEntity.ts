import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';

export class UserEntity extends Model {
  declare id: number;
  declare userId: number;
  declare entityId: number;
}

UserEntity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    entityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'entities',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'user_entities',
  }
);
