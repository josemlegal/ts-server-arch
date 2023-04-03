import { Pool, PoolClient, QueryResult } from "pg";
import { CustomError } from "../../../error/custom_error";
import { DataBaseError } from "../../../error/database_error";
import { User, CreateUser, UpdateUser } from "../../domain/models/user";
import { UserDataSource } from "../interfaces/user_data_source";
import {
  DELETE_USER_QUERY,
  INSERT_USER_QUERY,
  SELECT_USERS_QUERY,
  SELECT_USER_QUERY,
  UPDATE_USER_QUERY,
} from "../query_scripts/queries";
import { userFromPG } from "../utils/user_serializer";

export class PGUserDataSource implements UserDataSource {
  private db: Pool;
  private constructor(db: Pool) {
    this.db = db;
  }

  static create(dataSource: Pool) {
    if (PGUserDataSource.instance == null) {
      PGUserDataSource.instance = new PGUserDataSource(dataSource);
    }
    return PGUserDataSource.instance;
  }
  async getOne(id: string): Promise<User> {
    return await this.callDatabase(SELECT_USER_QUERY, [id], (result) =>
      userFromPG(result.rows[0])
    );
  }
  async getAll(): Promise<User[]> {
    return await this.callDatabase(SELECT_USERS_QUERY, [], (result) =>
      result.rows.map(userFromPG)
    );
  }
  async create(data: CreateUser): Promise<User> {
    return await this.callDatabase(
      INSERT_USER_QUERY,
      [data.name, data.email, data.password],
      (result) => userFromPG(result.rows[0])
    );
  }
  async update(data: UpdateUser): Promise<User> {
    return await this.callDatabase(
      UPDATE_USER_QUERY,
      [data.id, data.name, data.email, data.password],
      (result) => userFromPG(result.rows[0])
    );
  }
  async delete(userId: string): Promise<User> {
    return await this.callDatabase(DELETE_USER_QUERY, [userId], (result) =>
      userFromPG(result.rows[0])
    );
  }

  static instance: PGUserDataSource | null = null;

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
