import { TransactionRepository } from "../domain/repositories/transaction_repository";
import express from "express";

export default function transactionsRouter(
  transactionRepository: TransactionRepository
) {
  const router = express.Router();

  router.post("/", async (req, res) => {
    try {
      const newTx = await transactionRepository.createTx(req.body);
      res.status(201).send(newTx);
    } catch (err) {
      res.status(500).json({ message: "Could not create a transaction" });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const allTx = await transactionRepository.getAllTx();
      res.status(200).send(allTx);
    } catch (err) {
      res.status(500).json({ message: "Could not get transactions" });
    }
  });

  return router;
}
