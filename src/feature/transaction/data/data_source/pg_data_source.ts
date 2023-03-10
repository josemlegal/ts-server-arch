import { ClientRequest } from "http";
import { Pool, PoolClient, QueryResult } from "pg";
import {
  Transaction,
  CreateTx,
  UpdateTx,
} from "../../domain/models/transaction";
import { TransactionDataSource } from "../interfaces/transaction_data_source";
import { INSERT_TRANSACTION_QUERY } from "../query_scripts/queries";
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

  async getUserTx(id?: string | undefined): Promise<Transaction> {
    throw new Error("Method not implemented.");
  }
  getAllUserTx(): Promise<Transaction[]> {
    throw new Error("Method not implemented.");
  }
  async createTx(data: CreateTx): Promise<Transaction> {
    return await this.callDatabase(
      INSERT_TRANSACTION_QUERY,
      [data.title, data.description, data.amount],
      (result) => transactionFromPG(result.rows[0])
    );
  }
  updateTx(txId: string, data: UpdateTx): Promise<Transaction> {
    throw new Error("Method not implemented.");
  }
  deleteTx(txId: string): Promise<Transaction> {
    throw new Error("Method not implemented.");
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
