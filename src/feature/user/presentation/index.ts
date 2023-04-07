import { pool } from "../../../core/services/postgres/database_service_pool";
import { PGUserDataSource } from "../data/data_source/pg_data_source";
import { UserRepositoryImplementation } from "../domain/repositories/user_repository_implementation";
import UserRouter from "./user_router";

const usersDataSource = PGUserDataSource.create(pool);

const usersRepository = UserRepositoryImplementation.create(usersDataSource);

export const usersRouter = UserRouter(usersRepository);
