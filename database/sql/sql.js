import sql from "mysql2/promise";
import { configDotenv } from "dotenv";
import { Sequelize } from "sequelize";


configDotenv();

export const connection = sql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
});
connection
  .then((response) => {
    console.log("SQL connected");
  })
  .catch((err) => {
    console.log({ message: "SQL error", error: err });
  });

const seqalize = new Sequelize({
  username: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  dialect: process.env.DIALECT,
});

export default seqalize;
