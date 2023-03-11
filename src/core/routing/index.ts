import express, { Application } from "express";
import { transactionsRouter } from "../../feature/transaction/presentation";

export const configureRoutes = (app: Application) => {
  const router = express.Router();
  app.use("/api", router);
  router.use("/transaction", transactionsRouter);
};
