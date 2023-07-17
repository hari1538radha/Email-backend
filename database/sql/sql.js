import sql from "mysql2/promise";
import { configDotenv } from "dotenv";
configDotenv();
export const connection = sql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});
connection.then((response) => {
  console.log("SQL connected");
}).catch((err) => {
  console.log({ message: "error", error: err });
});
