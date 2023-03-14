import { Pool, PoolClient, QueryResult } from "pg";
import {
  PaymentMethod,
  CreatePaymentMethod,
  UpdatePaymentMethod,
} from "../../domain/models/payment_method";
import { PaymentMethodDataSource } from "../interfaces/payment_method_data_source";
import {
  DELETE_PAYMENT_METHOD_QUERY,
  INSERT_PAYMENT_METHOD_QUERY,
  SELECT_PAYMENT_METHODS_QUERY,
  SELECT_PAYMENT_METHOD_QUERY,
  UPDATE_PAYMENT_METHOD_QUERY,
} from "../query_scripts/queries";
import { paymentMethodFromPG } from "../utils/payment_method_serializer";

export class PGPaymentMethodDataSource implements PaymentMethodDataSource {
  private db: Pool;
  private constructor(db: Pool) {
    this.db = db;
  }
  static create(dataSource: Pool) {
    if (PGPaymentMethodDataSource.instance == null) {
      PGPaymentMethodDataSource.instance = new PGPaymentMethodDataSource(
        dataSource
      );
    }
    return PGPaymentMethodDataSource.instance;
  }
  async getOne(paymentMethodId: string): Promise<PaymentMethod> {
    return await this.callDatabase(
      SELECT_PAYMENT_METHOD_QUERY,
      [paymentMethodId],
      (result) => paymentMethodFromPG(result.rows[0])
    );
  }
  async getAllPaymentMethods(): Promise<PaymentMethod[]> {
    return await this.callDatabase(SELECT_PAYMENT_METHODS_QUERY, [], (result) =>
      result.rows.map(paymentMethodFromPG)
    );
  }
  async createPaymentMethod(data: CreatePaymentMethod): Promise<PaymentMethod> {
    return await this.callDatabase(
      INSERT_PAYMENT_METHOD_QUERY,
      [data.title],
      (result) => paymentMethodFromPG(result.rows[0])
    );
  }
  async updatePaymentMethod(data: UpdatePaymentMethod): Promise<PaymentMethod> {
    return await this.callDatabase(
      UPDATE_PAYMENT_METHOD_QUERY,
      [data.id, data.title],
      (result) => paymentMethodFromPG(result.rows[0])
    );
  }
  async deletePaymentMethod(paymentMethodId: string): Promise<PaymentMethod> {
    return await this.callDatabase(
      DELETE_PAYMENT_METHOD_QUERY,
      [paymentMethodId],
      (result) => paymentMethodFromPG(result.rows[0])
    );
  }

  static instance: PGPaymentMethodDataSource | null = null;

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
