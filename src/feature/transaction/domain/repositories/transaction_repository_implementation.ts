import { CustomError } from "../../../error/custom_error";
import { GenericError } from "../../../error/generic_error";
import { TransactionDataSource } from "../../data/interfaces/transaction_data_source";
import { Transaction, CreateTx, UpdateTx } from "../models/transaction";
import { TransactionRepository } from "./transaction_repository";

export class TransactionRepositoryImplementation
  implements TransactionRepository
{
  private transactionDataSource: TransactionDataSource;
  static TransactionRepositoryImplementation: TransactionRepositoryImplementation;
  private constructor(dataSource: TransactionDataSource) {
    this.transactionDataSource = dataSource;
  }

  async getOne(txId: string): Promise<Transaction> {
    return await this.callDataSource(() =>
      this.transactionDataSource.getSingleTx(txId)
    );
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
  async updateTx(txId: string, data: UpdateTx): Promise<Transaction> {
    return await this.callDataSource(async () => {
      const selectedTx = await this.transactionDataSource.getSingleTx(txId);
      const updatedTx = {
        ...selectedTx,
        ...data,
      };
      this.transactionDataSource.updateTx(updatedTx);
    });
  }
  async deleteTx(txId: string): Promise<Transaction> {
    return await this.callDataSource(() => {
      this.transactionDataSource.deleteTx(txId);
    });
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
      if (error instanceof CustomError) {
        throw error;
      }
    }
    throw new GenericError("Transactions Repositories error.");
  }
}
