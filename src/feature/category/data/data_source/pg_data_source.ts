import { DatabaseError, Pool, PoolClient, QueryResult } from "pg";
import { CustomError } from "../../../error/custom_error";
import { DataBaseError } from "../../../error/database_error";
import {
  Category,
  CreateCategory,
  UpdateCategory,
} from "../../domain/models/category";
import { CategoryDataSource } from "../interfaces/category_data_source";
import {
  DELETE_CATEGORY_QUERY,
  INSERT_CATEGORY_QUERY,
  SELECT_CATEGORIES_QUERY,
  SELECT_CATEGORY_QUERY,
  UPDATE_CATEGORY_QUERY,
} from "../query_scripts/queries";
import { categoryFromPG } from "../utils/category_serializer";

export class PGCategoryDataSource implements CategoryDataSource {
  private db: Pool;
  private constructor(db: Pool) {
    this.db = db;
  }
  static create(dataSource: Pool) {
    if (PGCategoryDataSource.instance == null) {
      PGCategoryDataSource.instance = new PGCategoryDataSource(dataSource);
    }
    return PGCategoryDataSource.instance;
  }

  async getCategory(id: string): Promise<Category> {
    return await this.callDatabase(SELECT_CATEGORY_QUERY, [id], (result) =>
      categoryFromPG(result.rows[0])
    );
  }
  async getAllCategories(): Promise<Category[]> {
    return await this.callDatabase(SELECT_CATEGORIES_QUERY, [], (result) =>
      result.rows.map(categoryFromPG)
    );
  }
  async createCategory(data: CreateCategory): Promise<Category> {
    return await this.callDatabase(
      INSERT_CATEGORY_QUERY,
      [data.title, data.transactionTypeId],
      (result) => result.rows[0]
    );
  }
  async updateCategory(data: UpdateCategory): Promise<Category> {
    return await this.callDatabase(
      UPDATE_CATEGORY_QUERY,
      [data.id, data.title, data.transactionTypeId],
      (result) => result.rows[0]
    );
  }
  async deleteCategory(id: string): Promise<Category> {
    return await this.callDatabase(
      DELETE_CATEGORY_QUERY,
      [id],
      (result) => result.rows[0]
    );
  }

  static instance: PGCategoryDataSource | null = null;

  private async callDatabase<T>(
    query: string,
    values: any[],
    callback: (result: QueryResult<any>) => T
  ): Promise<T> {
    let client: PoolClient;
    client = await this.db.connect();
    try {
      const response = await client.query(query, values);
      return callback(response);
    } catch (err) {
      if (err instanceof CustomError) {
        throw err;
      }
      throw new DataBaseError(err as Error);
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}
