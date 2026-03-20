import app from "./app.js";
import { sequelize } from "./config/database.js";

const PORT = process.env["PORT"] || 3000;

async function startServer() {
  try {
    // 1. Authentification à la base de données
    await sequelize.authenticate();
    console.log("✅ Connexion à la base de données établie avec succès.");

    // 2. Synchronisation des modèles
    // En production, on utilise une sync simple pour éviter d'écraser des données par erreur
    await sequelize.sync();
    console.log("✅ Modèles synchronisés.");

    // 3. Lancement du serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur actif sur le port ${PORT}`);
      if (process.env["NODE_ENV"] !== "production") {
        console.log(`📡 URL locale : http://localhost:${PORT}/api`);
      }
    });
  } catch (error) {
    console.error("❌ Impossible de démarrer le serveur :", error);
    process.exit(1);
  }
}

startServer();
