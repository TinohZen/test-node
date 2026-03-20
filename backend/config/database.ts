import { Sequelize } from "sequelize";
import pg from "pg";

const isProduction = process.env["NODE_ENV"] === "production";

export const sequelize = isProduction
  ? new Sequelize(process.env["DATABASE_URL"], {
      dialect: "postgres",
      dialectModule: pg, // <--- Indispensable pour Vercel
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    })
  : new Sequelize({
      dialect: "sqlite",
      storage: "./database.sqlite", // En local, SQLite n'a pas besoin de dialectModule
      logging: console.log,
    });
