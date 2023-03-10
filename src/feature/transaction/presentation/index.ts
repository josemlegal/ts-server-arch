import { pool } from "../../../core/services/database_service";
import { PGTransactionsDataSource } from "../data/data_source/pg_data_source";
import { TransactionRepositoryImplementation } from "../domain/repositories/transaction_repository_implementation";
import TransactionRouter from "./transaction_router";

const transactionsDataSource = PGTransactionsDataSource.create(pool);

const transactionsRepository = TransactionRepositoryImplementation.create(
  transactionsDataSource
);

export const transactionsRouter = TransactionRouter(transactionsRepository);
