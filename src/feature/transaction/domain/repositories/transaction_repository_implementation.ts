import { TransactionDataSource } from "../../data/interfaces/transaction_data_source";
import { Transaction, CreateTx, UpdateTx } from "../models/transaction";
import { TransactionRepository } from "./transaction_repository";

export class TransactionRepositoryImplementation
  implements TransactionRepository
{
  private transactionDataSource: TransactionDataSource;
  private constructor(dataSource: TransactionDataSource) {
    this.transactionDataSource = dataSource;
  }
  getUserTx(id?: string | undefined): Promise<Transaction> {
    throw new Error("Method not implemented.");
  }
  async getAllTx(): Promise<Transaction[]> {
    return await this.callDataSource(() =>
      this.transactionDataSource.getAllTx()
    );
  }
  async createTx(data: CreateTx): Promise<Transaction> {
    return await this.callDataSource(() =>
      this.transactionDataSource.createTx(data)
    );
  }
  updateTx(txId: string, data: UpdateTx): Promise<Transaction> {
    throw new Error("Method not implemented.");
  }
  deleteTx(txId: string): Promise<Transaction> {
    throw new Error("Method not implemented.");
  }

  static instance: TransactionRepository | null = null;

  static create(dataSource: TransactionDataSource) {
    if (TransactionRepositoryImplementation.instance == null) {
      TransactionRepositoryImplementation.instance =
        new TransactionRepositoryImplementation(dataSource);
    }
    return TransactionRepositoryImplementation.instance;
  }

  private async callDataSource<T>(callback: Function): Promise<T> {
    try {
      return await callback();
    } catch (error) {
      console.log(error);
      throw error;
    }
    // throw new GenericError("Users Repositories error.");
  }
}
