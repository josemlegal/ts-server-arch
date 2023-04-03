import { CustomError } from "../../../error/custom_error";
import { GenericError } from "../../../error/generic_error";
import { CategoryDataSource } from "../../data/interfaces/category_data_source";
import { Category, CreateCategory, UpdateCategory } from "../models/category";
import { CategoryRepository } from "./category_repository";

export class CategoryRepositoryImplementation implements CategoryRepository {
  private categoryDataSource: CategoryDataSource;
  static CategoryRepositoryImplementation: CategoryRepositoryImplementation;
  private constructor(dataSource: CategoryDataSource) {
    this.categoryDataSource = dataSource;
  }
  async getCategory(id: string): Promise<Category> {
    return await this.callDataSource(() =>
      this.categoryDataSource.getCategory(id)
    );
  }
  async getAllCategories(): Promise<Category[]> {
    return await this.callDataSource(() =>
      this.categoryDataSource.getAllCategories()
    );
  }
  async createCategory(data: CreateCategory): Promise<Category> {
    return await this.callDataSource(() =>
      this.categoryDataSource.createCategory(data)
    );
  }
  async updateCategory(id: string, data: UpdateCategory): Promise<Category> {
    return await this.callDataSource(async () => {
      const selectedCategory = await this.categoryDataSource.getCategory(id);
      const updatedCategory = {
        ...selectedCategory,
        ...data,
      };
      this.categoryDataSource.updateCategory(updatedCategory);
    });
  }
  async deleteCategory(id: string): Promise<Category> {
    return await this.callDataSource(() =>
      this.categoryDataSource.deleteCategory(id)
    );
  }

  static instance: CategoryRepository | null = null;

  static create(dataSource: CategoryDataSource) {
    if (CategoryRepositoryImplementation.instance == null) {
      CategoryRepositoryImplementation.instance =
        new CategoryRepositoryImplementation(dataSource);
    }
    return CategoryRepositoryImplementation.instance;
  }

  private async callDataSource<T>(callback: Function): Promise<T> {
    try {
      return await callback();
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        throw error;
      }
    }
    throw new GenericError("Categories Repositories error.");
  }
}
