import { Sequelize } from 'sequelize';

// Use SQLite for local development/preview, and PostgreSQL for production (Docker)
const isProduction = process.env['NODE_ENV'] === 'production';

export const sequelize = isProduction
  ? new Sequelize(process.env['DATABASE_URL'] || 'postgres://user:password@db:5432/appdb', {
      dialect: 'postgres',
      logging: false,
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite',
      logging: false,
    });
