import express from "express";

const app = express();

app.use(express.json());
//Configuracion del router.
app.listen(4200, () => {
  console.log(`Example app listening on port 4200!`);
});
