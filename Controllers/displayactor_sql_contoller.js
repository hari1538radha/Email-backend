import { connection } from "../database/sql/sql.js";

export const display_actors = async (req, res, next) => {
  const query = "SELECT  * from actor";
  const dbconnect = await connection;
  await dbconnect
    .execute(query)
    .then((response) => {
      res.send(response[0]);
    })
    .catch((err) => {
      res.send(err);
    });
};

export const display_actorbyName = async (req, res, next) => {
  const { first_name } = req.query;
  const query = `SELECT  * from actor where first_name='${first_name}'`;
  const dbconnect = await connection;
  await dbconnect
    .execute(query)
    .then((response) => {
      if (response[0].length) {
        res.send(response[0]);
      } else {
        res.send({ message: "no matching data found" });
      }
    })
    .catch((err) => {
      res.send(err);
    });
};
