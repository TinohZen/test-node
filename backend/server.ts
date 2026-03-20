import app from "./app.js";
import { sequelize } from "./config/database.js";

const PORT = process.env["PORT"] || 3000;

async function startServer() {
  try {
    // 1. Test de la connexion
    await sequelize.authenticate();
    console.log("✅ Connexion à la base de données établie avec succès.");

    // 2. Synchronisation des modèles
    // Note: Puisque tu as créé les tables manuellement sur Supabase via le SQL Editor,
    // sequelize.sync() vérifiera juste que tout correspond.
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
    // On ne kill pas le process en local pour pouvoir débugger plus facilement
    if (process.env["NODE_ENV"] === "production") {
      process.exit(1);
    }
  }
}

startServer();
