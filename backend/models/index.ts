import { sequelize } from '../config/database.js';
import { User } from './User.js';
import { Entity } from './Entity.js';
import { UserEntity } from './UserEntity.js';

User.belongsToMany(Entity, { through: UserEntity, foreignKey: 'userId' });
Entity.belongsToMany(User, { through: UserEntity, foreignKey: 'entityId' });

export { sequelize, User, Entity, UserEntity };
