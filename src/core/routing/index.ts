import express, { Application } from "express";
import { transactionsRouter } from "../../feature/transaction/presentation";
import { usersRouter } from "../../feature/user/presentation/";
import { categoriesRouter } from "../../feature/category/presentation";
import { paymentMethodsRouter } from "../../feature/payment_method/presentation/";
import { transactionTypesRouter } from "../../feature/transaction_type/presentation";

export const configureRoutes = (app: Application) => {
  const router = express.Router();
  router.use("/transaction", transactionsRouter);
  router.use("/user", usersRouter);
  router.use("/category", categoriesRouter);
  router.use("/payment-method", paymentMethodsRouter);
  router.use("/transaction-type", transactionTypesRouter);
  app.use("/api", router);
};
