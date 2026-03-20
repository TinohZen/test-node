import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.routes.js";

const app = express();

// Configuration CORS : Autorise les requêtes provenant de ton futur frontend Vercel
app.use(
  cors({
    origin: "https://test-nodefrontend.vercel.app", //  URL frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware pour lire le JSON dans les requêtes POST/PUT
app.use(express.json());

// Préfixe toutes les routes par /api
app.use("/api", apiRoutes);

export default app;
