import { Pool } from "pg";
import { config } from "./database_config";

export const pool = new Pool({
  connectionString: `postgres://${config.name}:${config.password}@localhost:${config.port}/${config.dbname}`,
});
