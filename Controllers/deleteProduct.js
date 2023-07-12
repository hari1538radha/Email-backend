import { productModel } from "../database/schema/ProductSchema.js";
export const deleteProduct = async (req, res, next) => {
  try {
    const _id = req.query._id;
    productModel
      .deleteOne({ _id: _id })
      .then((response) => {
        response.acknowledged == true && response.deletedCount > 0
          ? res.send({ status: 200, message: "deleted succesfully", response })
          : res.send({ message: "failed to delete" });
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (error) {
    res.send({ error: error });
  }
};
