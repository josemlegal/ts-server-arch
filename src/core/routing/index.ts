import express, { Application } from "express";
import { transactionsRouter } from "../../feature/transaction/presentation";

export const configureRoutes = (app: Application) => {
  const router = express.Router();
  router.use("/transaction", transactionsRouter);
  app.use("/api", router);
};
