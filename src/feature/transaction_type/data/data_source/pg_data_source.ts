import { Pool, PoolClient, QueryResult } from "pg";
import {
  TransactionType,
  CreateTransactionType,
  UpdateTransactionType,
} from "../../domain/models/transaction_type";
import { TransactionTypeDataSource } from "../interfaces/transaction_type_data_source";
import {
  DELETE_TRANSACTION_TYPE_QUERY,
  INSERT_TRANSACTION_TYPE_QUERY,
  SELECT_TRANSACTION_TYPES_QUERY,
  SELECT_TRANSACTION_TYPE_QUERY,
  UPDATE_TRANSACTION_TYPE_QUERY,
} from "../query_scripts/queries";
import { transactionTypeFromPG } from "../utils/transaction_type_serializer";

export class PGTransactionTypeDataSource implements TransactionTypeDataSource {
  private db: Pool;
  private constructor(db: Pool) {
    this.db = db;
  }
  async getSingleTransactionType(
    transactionTypeId: string
  ): Promise<TransactionType> {
    return await this.callDatabase(
      SELECT_TRANSACTION_TYPE_QUERY,
      [transactionTypeId],
      (result) => transactionTypeFromPG(result.rows[0])
    );
  }
  async getAllTransactionTypes(): Promise<TransactionType[]> {
    return await this.callDatabase(
      SELECT_TRANSACTION_TYPES_QUERY,
      [],
      (result) => result.rows.map(transactionTypeFromPG)
    );
  }
  async createTransactionType(
    data: CreateTransactionType
  ): Promise<TransactionType> {
    return await this.callDatabase(
      INSERT_TRANSACTION_TYPE_QUERY,
      [data.type],
      (result) => transactionTypeFromPG(result.rows[0])
    );
  }
  async updateTransactionType(
    data: UpdateTransactionType
  ): Promise<TransactionType> {
    return await this.callDatabase(
      UPDATE_TRANSACTION_TYPE_QUERY,
      [data.id, data.type],
      (result) => transactionTypeFromPG(result.rows[0])
    );
  }
  async deleteTransactionType(id: string): Promise<TransactionType> {
    return await this.callDatabase(
      DELETE_TRANSACTION_TYPE_QUERY,
      [id],
      (result) => transactionTypeFromPG(result.rows[0])
    );
  }

  static create(dataSource: Pool) {
    if (PGTransactionTypeDataSource.instance == null) {
      PGTransactionTypeDataSource.instance = new PGTransactionTypeDataSource(
        dataSource
      );
    }
    return PGTransactionTypeDataSource.instance;
  }

  static instance: PGTransactionTypeDataSource;

  private async callDatabase<T>(
    query: string,
    values: any[],
    callback: (result: QueryResult<any>) => T
  ): Promise<T> {
    let client: PoolClient;
    client = await this.db.connect();

    try {
      const reponse = await client.query(query, values);
      return callback(reponse);
    } catch (error) {
      throw error;
    } finally {
      if (client) {
        client.release();
      }
    }
  }
}
