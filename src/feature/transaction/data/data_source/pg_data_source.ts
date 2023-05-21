import { ClientRequest } from "http";
import { Pool, PoolClient, QueryResult } from "pg";
import { CustomError } from "../../../error/custom_error";
import { DataBaseError } from "../../../error/database_error";
import {
  Transaction,
  CreateTx,
  UpdateTx,
} from "../../domain/models/transaction";
import { TransactionDataSource } from "../interfaces/transaction_data_source";
import {
  DELETE_TRANSACTION_QUERY,
  INSERT_TRANSACTION_QUERY,
  SELECT_TRANSACTIONS_QUERY,
  SELECT_TRANSACTION_QUERY,
  UPDATE_TRANSACTION_QUERY,
} from "../query_scripts/queries";
import { transactionFromPG } from "../utils/transaction_serializer";

export class PGTransactionsDataSource implements TransactionDataSource {
  private db: Pool;
  private constructor(db: Pool) {
    this.db = db;
  }
  static create(dataSource: Pool) {
    if (PGTransactionsDataSource.instance == null) {
      PGTransactionsDataSource.instance = new PGTransactionsDataSource(
        dataSource
      );
    }
    return PGTransactionsDataSource.instance;
  }

  async getSingleTx(txId: string): Promise<Transaction> {
    return await this.callDatabase(SELECT_TRANSACTION_QUERY, [txId], (result) =>
      transactionFromPG(result.rows[0])
    );
  }
  async getAllTx(): Promise<Transaction[]> {
    return await this.callDatabase(SELECT_TRANSACTIONS_QUERY, [], (result) =>
      result.rows.map(transactionFromPG)
    );
  }
  async createTx(data: CreateTx): Promise<Transaction> {
    return await this.callDatabase(
      INSERT_TRANSACTION_QUERY,
      [
        data.description,
        data.amount,
        data.userId,
        data.categoryId,
        data.paymentMethodId,
      ],
      (result) => transactionFromPG(result.rows[0])
    );
  }
  async updateTx(data: UpdateTx): Promise<Transaction> {
    return await this.callDatabase(
      UPDATE_TRANSACTION_QUERY,
      [
        data.id,
        data.description,
        data.amount,
        data.userId,
        data.categoryId,
        data.paymentMethodId,
      ],
      (result) => transactionFromPG(result.rows[0])
    );
  }
  async deleteTx(id: string): Promise<Transaction> {
    return await this.callDatabase(DELETE_TRANSACTION_QUERY, [id], (result) =>
      transactionFromPG(result.rows[0])
    );
  }
  static instance: PGTransactionsDataSource | null = null;

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
