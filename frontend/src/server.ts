import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from "@angular/ssr/node";
import express from "express";
import { join } from "node:path";
import { existsSync } from "node:fs";

// Le dossier où sont construits vos fichiers (généralement dans dist/app/browser)
const browserDistFolder = join(import.meta.dirname, "../browser");

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * 1. Servir les fichiers statiques (JS, CSS, images, etc.)
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: "1y",
    index: false,
    redirect: false,
  })
);

/**
 * 2. Gestion SSR par Angular
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});

/**
 * 3. Fallback : Si aucune route ne correspond (cas typique du rafraîchissement),
 * on renvoie index.html pour que le routeur d'Angular s'occupe de la page.
 */
app.use((req, res) => {
  const indexHtml = join(browserDistFolder, "index.html");
  if (existsSync(indexHtml)) {
    res.sendFile(indexHtml);
  } else {
    res.status(404).send("Not Found");
  }
});

/**
 * Lancement du serveur (utilisé uniquement en local)
 */
if (isMainModule(import.meta.url) || process.env["pm_id"]) {
  const port = process.env["PORT"] || 4200;
  app.listen(port, () => {
    console.log(`Frontend Angular listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
