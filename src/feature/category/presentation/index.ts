import { pool } from "../../../core/services/database_service";
import { PGCategoryDataSource } from "../data/data_source/pg_data_source";
import { CategoryRepositoryImplementation } from "../domain/repositories/category_repository_implementation";
import CategoryRouter from "./category_router";

const categorysDataSource = PGCategoryDataSource.create(pool);

const categorysRepository =
  CategoryRepositoryImplementation.create(categorysDataSource);

export const categorysRouter = CategoryRouter(categorysRepository);
