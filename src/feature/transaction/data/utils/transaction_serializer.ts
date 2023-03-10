import { Transaction } from "../../domain/models/transaction";

export const transactionFromPG = (item: any): Transaction => {
  return {
    id: item.transaction.id,
    title: item.transaction.title,
    description: item.transaction.description,
    amount: item.transaction.amount,
  };
};
