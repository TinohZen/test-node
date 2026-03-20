import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.routes.js";

const app = express();

// Liste des origines autorisées
const allowedOrigins = [
  "https://test-nodefrontend.vercel.app",
  "http://localhost:4200",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Autorise les requêtes sans origine (comme Postman) ou les domaines de la liste
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Bloqué par CORS : origine non autorisée"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Préfixe toutes les routes par /api
app.use("/api", apiRoutes);

export default app;
