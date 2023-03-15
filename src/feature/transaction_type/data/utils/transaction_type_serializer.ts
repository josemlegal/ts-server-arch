import { TransactionType } from "../../domain/models/transaction_type";

export const transactionTypeFromPG = (item: any): TransactionType => {
  return {
    id: item.id,
    title: item.title,
  };
};
