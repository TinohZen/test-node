import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.routes.js";

const app = express();

// Liste des origines autorisées
const allowedOrigins = [
  "https://test-nodefrontend.vercel.app", // pour prod
  "http://localhost:4200", // pour local
];

app.use(
  cors({
    origin: function (origin, callback) {
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

app.use("/api", apiRoutes);

export default app;
