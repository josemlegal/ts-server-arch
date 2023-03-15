import { TransactionTypeDataSource } from "../../data/interfaces/transaction_type_data_source";
import {
  TransactionType,
  CreateTransactionType,
  UpdateTransactionType,
} from "../models/transaction_type";
import { TransactionTypeRepository } from "./transaction_type_repository";

export class TransactionTypeRepositoryImplementation
  implements TransactionTypeRepository
{
  private transactionTypeDataSource: TransactionTypeDataSource;
  static TransactionTypeRepositoryImplementation: TransactionTypeRepositoryImplementation;
  private constructor(dataSource: TransactionTypeDataSource) {
    this.transactionTypeDataSource = dataSource;
  }
  async getOne(transactionTypeId: string): Promise<TransactionType> {
    return await this.callDataSource(() =>
      this.transactionTypeDataSource.getSingleTransactionType(transactionTypeId)
    );
  }
  async getAll(): Promise<TransactionType[]> {
    return await this.callDataSource(() =>
      this.transactionTypeDataSource.getAllTransactionTypes()
    );
  }
  async create(data: CreateTransactionType): Promise<TransactionType> {
    return await this.callDataSource(() =>
      this.transactionTypeDataSource.createTransactionType(data)
    );
  }
  async update(
    transactionTypeId: string,
    data: UpdateTransactionType
  ): Promise<TransactionType> {
    return await this.callDataSource(async () => {
      const selectedTxType =
        await this.transactionTypeDataSource.getSingleTransactionType(
          transactionTypeId
        );
      const updatedTxType = { ...selectedTxType, ...data };
      return await this.transactionTypeDataSource.updateTransactionType(
        updatedTxType
      );
    });
  }
  async delete(transactionTypeId: string): Promise<TransactionType> {
    return await this.callDataSource(() =>
      this.transactionTypeDataSource.deleteTransactionType(transactionTypeId)
    );
  }

  static instance: TransactionTypeRepositoryImplementation | null = null;
  static create(dataSource: TransactionTypeDataSource) {
    if (TransactionTypeRepositoryImplementation.instance == null) {
      TransactionTypeRepositoryImplementation.instance =
        new TransactionTypeRepositoryImplementation(dataSource);
    }
    return TransactionTypeRepositoryImplementation.instance;
  }

  private async callDataSource<T>(callback: Function): Promise<T> {
    try {
      return await callback();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
