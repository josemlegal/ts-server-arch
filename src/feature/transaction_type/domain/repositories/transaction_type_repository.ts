import {
  CreateTransactionType,
  TransactionType,
  UpdateTransactionType,
} from "../models/transaction_type";

export interface TransactionTypeRepository {
  getOne(transactionTypeId: string): Promise<TransactionType>;
  getAll(): Promise<TransactionType[]>;
  create(data: CreateTransactionType): Promise<TransactionType>;
  update(
    transactionTypeId: string,
    data: UpdateTransactionType
  ): Promise<TransactionType>;
  delete(transactionTypeId: string): Promise<TransactionType>;
}
