import app from "./app.js";
import { sequelize } from "./config/database.js";

const PORT = process.env["PORT"] || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log(
      "✅ Connection to the database has been established successfully."
    );

    // MODIFICATION ICI : On enlève { alter: true }
    // Sequelize créera les tables si elles manquent, sinon il ne fait rien.
    await sequelize.sync();

    console.log("✅ Database models synchronized.");

    app.listen(PORT, () => {
      console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1);
  }
}

// Lancement du script
startServer();
