import { Transaction } from "../../domain/models/transaction";

export const transactionFromPG = (item: any): Transaction => {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    amount: item.amount,
  };
};
