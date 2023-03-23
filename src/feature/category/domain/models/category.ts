export interface Category {
  id: string;
  title: string;
  transactionTypeId: string;
}

export interface CreateCategory extends Omit<Category, "id"> {}

export interface UpdateCategory extends Partial<Category> {}

export interface DeleteCategory {
  id: string;
}
