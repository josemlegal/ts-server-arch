import "dotenv/config";

export const config = {
  name: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  port: process.env.DB_PORT || 3000,
  dbname: process.env.DB_NAME || "postgres",
};
