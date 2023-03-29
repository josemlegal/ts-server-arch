import { Transaction } from "../../domain/models/transaction";

export const transactionFromPG = (item: any): Transaction => {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    amount: item.amount,
    userId: item.user_id,
    categoryId: item.category_id,
    paymentMethodId: item.payment_method_id,
  };
};
