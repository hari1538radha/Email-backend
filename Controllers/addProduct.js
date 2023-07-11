import { productModel } from "../database/schema/ProductSchema.js";
export const display = (req, res) => {
  const body = req.body;
  const newProduct = new productModel({
    name: body.name,
    description: body.description,
    price: body.price,
    category: body.category,
    brand: body.brand,
    color: body.color,
    weight: body.weight,
    dimensions: body.dimensions,
    inStock: body.inStock,
  });
  productModel.findOne({ name: body.name }).then((response) => {
    if (response) {
      res.send("product already exist");
    } else {
      newProduct
        .save()
        .then((response) => {
          console.log(response);
          res.send("product added succesfully");
        })
        .catch((err) => {
          res.send(JSON.stringify(err));
        });
    }
  });
};
