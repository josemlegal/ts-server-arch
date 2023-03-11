import { Client } from "pg";

const pool = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "postgres",
  database: "budget-app",
});

pool.connect();

pool.query(`SELECT * FROM public.transactions`, (err, res) => {
  if (!err) {
    console.log(res.rows);
  } else {
    console.log(err.message);
  }
  pool.end();
});
