import { upload } from "../index.js";
import product_model from "../database/model/product.model.js";

export const addProduct =  async (req, res, next) => {
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

export const display_product = async (req, res) => {
  try {
    // upload();
    // const { originalname, mimetype } =req.file
    console.log(req.file)
    const current_page = parseInt(req.query.current_page);
    const limit = parseInt(req.query.limit) 
    const offset = (current_page - 1) * limit;
    console.log(offset, current_page);
    if (current_page <= 0) {
      return res.send("the page no is nagative or zero");
    } else if (limit <= 0) {
      return res.send("the page limit is nagative or zero");
    }
    const products = await product_model.findAll({
      offset: offset,
      limit: limit,
    });
    console.log(products);
    res.send(products);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const delete_product = async (req, res) => {
  await product_model.destroy({ where: {} }).then((response) => {
    res.send({ message: "deleted", response: response }).catch((err) => {
      res.send(err);
    });
  });
};

export const delete_productById = async (req, res) => {
  const { id } = req.query;
  const product = await product_model
    .destroy({ where: { id: id } })
    .then((response) => {
      response == 1
        ? res.send({ message: `product with id:${id} deleted succesfully` })
        : res.send({ message: `product with id:${id} not found` });
    })
    .catch((err) => {
      res.send(err);
    });
  console.log(product);
};

export const updatebyID = async (req, res) => {
  const { id } = req.query;
  const { title, discription, price } = req.body;
  const product = await product_model.findOne({ where: { id: id } });
  console.log(product);
  if (product) {
    product_model
      .update(
        { title: title, discription: discription, price: price },
        { where: { id: id } }
      )
      .then((response) => {
        response[0] == 1
          ? res.send({ message: `product with id:${id} update succesfully` })
          : res.send("update failed : product not found ");
      })
      .catch((err) => {
        console.log(err);
      });
  } else res.send({ message: "product not found" });
};
