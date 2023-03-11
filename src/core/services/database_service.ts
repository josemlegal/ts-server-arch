import { Pool } from "pg";

export const pool = new Pool({
  connectionString: "postgres://postgres:postgres@localhost:5432/budget-app",
});
