export interface TransactionType {
  id: string;
  type: string;
}

export interface CreateTransactionType extends Omit<TransactionType, "id"> {}

export interface UpdateTransactionType extends Partial<TransactionType> {}

export interface DeleteTransactionType {
  id: string;
}
