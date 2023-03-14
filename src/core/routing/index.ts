import express, { Application } from "express";
import categoriesRouter from "../../feature/category/presentation/category_router";
import paymentMethodsRouter from "../../feature/payment_method/presentation/payment_method_router";
import { transactionsRouter } from "../../feature/transaction/presentation";
import usersRouter from "../../feature/user/presentation/user_router";

export const configureRoutes = (app: Application) => {
  const router = express.Router();
  router.use("/transaction", transactionsRouter);
  router.use("/user", usersRouter);
  router.use("/category", categoriesRouter);
  router.use("/payment-method", paymentMethodsRouter);
  app.use("/api", router);
};
