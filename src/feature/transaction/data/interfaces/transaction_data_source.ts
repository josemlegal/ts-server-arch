import {
  CreateTx,
  Transaction,
  UpdateTx,
} from "../../domain/models/transaction";

export interface TransactionDataSource {
  getUserTx(id?: string): Promise<Transaction>;
  getAllUserTx(): Promise<Transaction[]>;
  createTx(data: CreateTx): Promise<Transaction>;
  updateTx(txId: string, data: UpdateTx): Promise<Transaction>;
  deleteTx(txId: string): Promise<Transaction>;
}
