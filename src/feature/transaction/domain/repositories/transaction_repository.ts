import { CreateTx, Transaction, UpdateTx } from "../models/transaction";

export interface TransactionRepository {
  getOne(txId: string): Promise<Transaction>;
  getAllTx(): Promise<Transaction[]>;
  createTx(data: CreateTx): Promise<Transaction>;
  updateTx(txId: string, data: UpdateTx): Promise<Transaction>;
  deleteTx(txId: string): Promise<Transaction>;
}
