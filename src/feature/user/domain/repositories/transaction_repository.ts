import { Transaction } from "../models/transaction";

export interface TransactionRepository {
  getSingleUserTx(id?: string): Promise<Transaction>;
  getAllUserTx(): Promise<Transaction[]>;
  createTx(data: Transaction): Promise<Transaction>;
  updateTx(id: string, data: Transaction): Promise<Transaction>;
  deleteTx(id: string): Promise<Transaction>;
}
