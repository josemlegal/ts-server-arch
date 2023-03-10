import { TransactionRepository } from "../domain/repositories/transaction_repository";
import express from "express";

export default function transactionRouter(
  transactionRepository: TransactionRepository
) {
  const router = express.Router();
}
