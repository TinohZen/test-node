import { Sequelize } from "sequelize";
import pg from "pg";

const isProduction = process.env["NODE_ENV"] === "production";

export const sequelize = isProduction
  ? new Sequelize(process.env["DATABASE_URL"], {
      dialect: "postgres",
      dialectModule: pg,
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
      storage: "./database.sqlite",
      logging: console.log,
    });
