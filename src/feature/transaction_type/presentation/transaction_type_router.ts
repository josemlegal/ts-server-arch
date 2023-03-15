import express from "express";
import { TransactionTypeRepository } from "../domain/repositories/transaction_type_repository";

export default function transactionTypesRouter(
  transactionTypeRepository: TransactionTypeRepository
) {
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const allTxTypes = await transactionTypeRepository.getAll();
      res.status(200).send(allTxTypes);
    } catch (err) {
      res.status(500).json({ message: "Could not get all transaction types" });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const txType = await transactionTypeRepository.getOne(id);
      res.status(200).send(txType);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Could not get the single transaction type" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const newTxType = await transactionTypeRepository.create(req.body);
      res.status(200).send(newTxType);
    } catch (err) {
      res.status(500).json({ message: "Could not create a transaction type" });
    }
  });

  router.patch("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const txType = await transactionTypeRepository.update(id, req.body);
      res.status(200).send(txType);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Could not update the transaction type" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedTxType = await transactionTypeRepository.delete(id);
      res.status(200).send(deletedTxType);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Could not delete the transaction type" });
    }
  });
}
