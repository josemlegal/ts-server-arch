import express from "express";
import { configureRoutes } from "./core/routing";

const app = express();

app.use(express.json());
//Configuracion del router.

configureRoutes(app);

app.listen(4200, () => {
  console.log(`Example app listening on port 4200!`);
});
