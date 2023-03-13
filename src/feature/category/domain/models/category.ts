export interface Category {
  id: string;
  title: string;
}

export interface CreateCategory extends Omit<Category, "id"> {}

export interface UpdateCategory extends Partial<Category> {}

export interface DeleteCategory {
  id: string;
}
