import express, { Application } from "express";
import categoriesRouter from "../../feature/category/presentation/category_router";
import { transactionsRouter } from "../../feature/transaction/presentation";
import usersRouter from "../../feature/user/presentation/user_router";

export const configureRoutes = (app: Application) => {
  const router = express.Router();
  router.use("/transaction", transactionsRouter);
  router.use("/user", usersRouter);
  router.use("category", categoriesRouter);
  app.use("/api", router);
};
