export interface Transaction {
  id: string;
  description: string;
  amount: number;
  categoryId: string;
  userId: string;
  paymentMethodId: string;
}

export interface CreateTx extends Omit<Transaction, "id"> {}

export interface UpdateTx extends Partial<Transaction> {}

export interface DeleteTx {
  id: string;
}
