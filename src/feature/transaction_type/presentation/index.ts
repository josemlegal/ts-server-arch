import { pool } from "../../../core/services/postgres/database_service_pool";
import { PGTransactionTypeDataSource } from "../data/data_source/pg_data_source";
import { TransactionTypeRepositoryImplementation } from "../domain/repositories/transaction_type_implementation";
import TransactionTypeRouter from "./transaction_type_router";

const transactionTypesDataSource = PGTransactionTypeDataSource.create(pool);

const transactionsTypeRepository =
  TransactionTypeRepositoryImplementation.create(transactionTypesDataSource);

export const transactionTypesRouter = TransactionTypeRouter(
  transactionsTypeRepository
);
