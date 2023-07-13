import { productModel } from "../database/mongodb.model/product.model.js";
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

export const deleteAllProducts = async (req, res, next) => {
  try {
    productModel.deleteMany().then((response) => {
      res.send(response);
    });
  } catch (error) {
    res.send(error);
  }
};
