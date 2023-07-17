import { response } from "express";
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
    .findAll()
    .then((response) => {
      res.send(response);
    })
    .catch((error) => {
      res.snd(error);
    });
};
export const delete_product = async (req, res) => {
  //   const { product_id } = req.body;
  product_model.destroy({ where: {} }).then((response) => {
    res.send({ message: "deleted", response: response }).ctach((err) => {
      res.send(err);
    });
  });
};
export const delete_productById = async (req, res) => {
  const { id } = req.query;
  product_model
    .destroy({ where: { id: id } })
    .then((response) => {
      res.send({ message: "deleted succesfully", response: response });
    })
    .catch((err) => {
      res.send(err);
    });
};
