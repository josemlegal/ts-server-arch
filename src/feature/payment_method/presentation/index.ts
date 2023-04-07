import { pool } from "../../../core/services/postgres/database_service_pool";
import { PGPaymentMethodDataSource } from "../data/data_source/pg_data_source";
import { PaymentMethodRepositoryImplementation } from "../domain/repositories/payment_method_repository_implementation";
import paymentMethodRouter from "./payment_method_router";

const paymentMethodsDataSource = PGPaymentMethodDataSource.create(pool);

const paymentMethodsRepository = PaymentMethodRepositoryImplementation.create(
  paymentMethodsDataSource
);

export const paymentMethodsRouter = paymentMethodRouter(
  paymentMethodsRepository
);
