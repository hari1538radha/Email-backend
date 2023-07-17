import product_model from "../database/model/product.model.js";
import seqalize from "../database/sql/sql.js";
export const addProduct = async (req, res, next) => {
  const { _id, title, discription, price } = req.body;

  const product = await product_model
    .create({
      _id: 12,
      title: "mobtrtrbile",
      discription: "absdb etgrthaejbiatlenr",
      price: 58989545,
    })
    .then((response) => {
      console.log(response);
      res.send({ message: "uploded", data: response });
    })
    .catch((err) => {
      res.send(err);
    });
};
export const display_product = async (req, res, next) => {
  await product_model
    .findAll()
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.snd(error);
    });
};
