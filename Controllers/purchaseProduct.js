import { productModel } from "../database/schema/ProductSchema.js";
import { userModel } from "../database/schema/userSchema.js";

export const updateProductPurchased = async (req, res, next) => {
  const product_id = req.query.product_id;
  const { user_id, quantity } = req.query;
  const users = {
    user_id: user_id,
    quantity: quantity,
  };
  await productModel
    .updateOne(
      { _id: product_id },
      {
        $push: { purchasedUser: { ...users } },
        updatedAt: Date.now,
      }
    )
    .then((response) => {
      //   res.write("response");

      userUpdateCallback(user_id, product_id);
      //   res.send(response);
      // next(user_id, product_id, quantity);
    })
    .catch((err) => {
      res.send({ err, error: "error" });
    });
};

export const userUpdateCallback = async (user_id, product_id) => {
  const quantity = 8000;
  await userModel
    .updateOne(
      { _id: user_id },
      { $set: { product_id: product_id, quantity: quantity } }
    )
    .then((result) => {
      console.log(JSON.stringify(result));
    });
};
