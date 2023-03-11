import {
  CreateTx,
  Transaction,
  UpdateTx,
} from "../../domain/models/transaction";

export interface TransactionDataSource {
  getSingleTx(txId: string): Promise<Transaction>;
  getAllTx(): Promise<Transaction[]>;
  createTx(data: CreateTx): Promise<Transaction>;
  updateTx(data: UpdateTx): Promise<Transaction>;
  deleteTx(id: string): Promise<Transaction>;
}
