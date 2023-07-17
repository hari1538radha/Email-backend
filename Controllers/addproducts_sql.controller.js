import product_model from "../database/model/product.model.js";

export const addProduct = async (req, res, next) => {
  const { _id, title, discription, price } = req.body;

  const product = await product_model
    .create({
      _id: _id,
      title: title,
      discription: discription,
      price: price,
    })
    .then((response) => {
      res.send({ message: "uploded", data: response });
    })
    .catch((err) => {
      res.send(err);
    });
};
export const display_product = async (req, res, next) => {
  await product_model
    .findAll({ attributes: ["price", "_id"] })
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.snd(error);
    });
};
