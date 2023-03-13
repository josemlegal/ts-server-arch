import { Category, CreateCategory, UpdateCategory } from "../models/category";

export interface CategoryRepository {
  getCategory(id: string): Promise<Category>;
  getAllCategories(): Promise<Category[]>;
  createCategory(data: CreateCategory): Promise<Category>;
  updateCategory(id: string, data: UpdateCategory): Promise<Category>;
  deleteCategory(id: string): Promise<Category>;
}
