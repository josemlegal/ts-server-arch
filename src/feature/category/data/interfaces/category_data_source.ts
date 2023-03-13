import {
  Category,
  CreateCategory,
  UpdateCategory,
} from "../../domain/models/category";

export interface CategoryDataSource {
  getCategory(id: string): Promise<Category>;
  getAllCategories(): Promise<Category[]>;
  createCategory(data: CreateCategory): Promise<Category>;
  updateCategory(data: UpdateCategory): Promise<Category>;
  deleteCategory(id: string): Promise<Category>;
}
