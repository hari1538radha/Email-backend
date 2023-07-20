import { order_model } from "../database/model/Order.model";

export const create_order = async (req, res) => {
  const { product_id, user_id, quantity } = req.body;
  const order = await order_model
    .create({
      product_id: product_id,
      user_id: user_id,
      quantity: quantity,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
