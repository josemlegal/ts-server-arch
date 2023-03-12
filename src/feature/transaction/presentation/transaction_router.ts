import { TransactionRepository } from "../domain/repositories/transaction_repository";
import express, { Request, Response } from "express";
import { json } from "stream/consumers";

export default function transactionsRouter(
  transactionRepository: TransactionRepository
) {
  const router = express.Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
      const newTx = await transactionRepository.createTx(req.body);
      res.status(200).send(newTx);
    } catch (err) {
      res.status(500).json({ message: "Could not create a transaction" });
    }
  });

  router.get("/", async (req: Request, res: Response) => {
    try {
      const allTx = await transactionRepository.getAllTx();
      res.status(200).send(allTx);
    } catch (err) {
      res.status(500).json({ message: "Could not get all transactions" });
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const tx = await transactionRepository.getOne(id);
      res.status(200).send(tx);
    } catch (err) {
      res.status(500).json({ message: "Could not get the single transaction" });
    }
  });

  router.patch("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const tx = await transactionRepository.updateTx(id, req.body);
      res.status(200).send(tx);
    } catch (err) {
      res.status(500).json({ message: "Could not update the transaction" });
    }
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deletedTx = await transactionRepository.deleteTx(id);
      res.status(200).send(deletedTx);
    } catch (err) {
      res.status(500).json({ message: "Could not delete the transaction" });
    }
  });

  return router;
}
