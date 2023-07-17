import { connection } from "../database/sql/sql.js";

export const display_actors = (req, res, next) => {
  connection.query("SELECT  * from actor", (err, response) => {
    if (err) {
      res.send({ error: err });
    } else {
      res.send(response);
    }
  });
};
