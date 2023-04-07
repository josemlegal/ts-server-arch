import { Pool } from "pg";
import { config } from "./database_config";

export const pool = new Pool({
  connectionString: `postgres://${config.dbUser}:${config.dbPassword}@${config.dbPort}:${config.dbPort}/${config.dbName}`,
});
