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
      res.send(error);
    });
};

export const delete_product = async (req, res) => {
  product_model.destroy({ where: {} }).then((response) => {
    res.send({ message: "deleted", response: response }).ctach((err) => {
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
