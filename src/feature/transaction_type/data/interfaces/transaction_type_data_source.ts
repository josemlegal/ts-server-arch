import {
  CreateTransactionType,
  TransactionType,
  UpdateTransactionType,
} from "../../domain/models/transaction_type";

export interface TransactionTypeDataSource {
  getSingleTransactionType(transactionTypeId: string): Promise<TransactionType>;
  getAllTransactionTypes(): Promise<TransactionType[]>;
  createTransactionType(data: CreateTransactionType): Promise<TransactionType>;
  updateTransactionType(data: UpdateTransactionType): Promise<TransactionType>;
  deleteTransactionType(id: string): Promise<TransactionType>;
}
