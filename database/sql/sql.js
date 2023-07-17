import sql from "mysql2";
import { configDotenv } from "dotenv";
configDotenv();
export const connection = sql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});
connection.connect((err) => {
  if (err) {
    console.log(error);
  } else {
    console.log({ message: "SQL connected" });
  }
});
