import { Sequelize } from "sequelize";

const isProduction = process.env["NODE_ENV"] === "production";

export const sequelize = isProduction
  ? new Sequelize(process.env["DATABASE_URL"]!, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Indispensable pour la connexion sécurisée à Supabase
        },
      },
      logging: false,
    })
  : new Sequelize({
      dialect: "sqlite",
      storage: "./database.sqlite",
      logging: false,
    });
