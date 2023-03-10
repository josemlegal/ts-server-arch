import { Pool } from "pg";
import {
  Transaction,
  CreateTx,
  UpdateTx,
} from "../../domain/models/transaction";
import { TransactionDataSource } from "../interfaces/transaction_data_source";

export class PGTransactionsDataSource implements TransactionDataSource {
  private db: Pool;
  private constructor(db: Pool) {
    this.db = db;
  }
  getUserTx(id?: string | undefined): Promise<Transaction> {
    throw new Error("Method not implemented.");
  }
  getAllUserTx(): Promise<Transaction[]> {
    throw new Error("Method not implemented.");
  }
  createTx(data: CreateTx): Promise<Transaction> {
    throw new Error("Method not implemented.");
  }
  updateTx(txId: string, data: UpdateTx): Promise<Transaction> {
    throw new Error("Method not implemented.");
  }
  deleteTx(txId: string): Promise<Transaction> {
    throw new Error("Method not implemented.");
  }
  static instance: PGTransactionsDataSource | null = null;
}
