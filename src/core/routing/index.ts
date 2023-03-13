import express, { Application } from "express";
import { transactionsRouter } from "../../feature/transaction/presentation";
import usersRouter from "../../feature/user/presentation/user_router";

export const configureRoutes = (app: Application) => {
  const router = express.Router();
  router.use("/transaction", transactionsRouter);
  router.use("/user", usersRouter);
  app.use("/api", router);
};
