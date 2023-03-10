import express from "express";
import transactionRouter from "../../feature/transaction/presentation/transaction_router";

export const configureRoutes = (app: express.Application) => {
  const router = express.Router();
  app.use("/api", router);
  router.use("/transaction", transactionRouter);
};
