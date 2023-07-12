import { productModel } from "../database/schema/ProductSchema.js";

export const updateProduct = async (req, res, next) => {
  const _id = req.query._id;
  const body = req.body;
  const update_Count = req.query.count;
  update_Count == 1
    ? await productModel
        .updateOne(
          { _id: _id },

          {
            $set: {
              name: body.name,
              description: body.description,
              price: body.price,
              category: body.category,
              brand: body.brand,
              color: body.color,
              weight: body.weight,
              dimensions: body.dimensions,
              inStock: body.inStock,
            },
          },
          { upsert: true },
          { new: true }
        )
        .then((response) => {
          res.send({ message: "updated successfully", product: response });
        })
        .catch((err) => {
          res.send(err);
        })
    : await productModel
        .updateMany({
          $set: {
            name: "android",
          },
        })
        .then((response) => {
          res.send({
            status: 200,
            message: "updated all the name of the collection",
            result: response,
          });
        });
};
