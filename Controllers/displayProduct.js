import { productModel } from "../database/schema/ProductSchema.js";

export const findProduct = (req, res, next) => {
  productModel
    .find()
    .then((response) => {
      res.send({ message: "found", productsList: response });
    })
    .catch((err) => {
      res.send(JSON.stringify(err));
    });
};

export const findProductBy_ID = (req, res, next) => {
  productModel
    .findOne({ _id: req.query._id })
    .populate("products.user_id")
    .then((response) => {
      if (!response) {
        return res.send("product not found");
      } else {
        res.send({ message: "product found", product: response });
      }
    })
    .catch((err) => {
      res.send({ message: "error", error: JSON.stringify(err) });
      res.end();
    });
};
