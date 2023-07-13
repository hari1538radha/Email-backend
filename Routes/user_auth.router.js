import express from "express";
import { jwtAuth } from "../utils/jwt.auth.js";
import { display } from "../Controllers/add_product.controller.js";
import { findProduct } from "../Controllers/display_product.controller.js";
import { findProductBy_ID } from "../Controllers/display_product.controller.js";
import { updateProduct } from "../Controllers/update_product.controller.js";
import { deleteProduct } from "../Controllers/delete_product.controller.js";
import { deleteAllProducts } from "../Controllers/delete_product.controller.js";
import { updateProductPurchased } from "../Controllers/product_purchase.controller.js";
import { userUpdateCallback } from "../Controllers/product_purchase.controller.js";

const protectedRoute = express.Router();

protectedRoute.get("/addproducts", jwtAuth, display);
protectedRoute.get("/display_all", jwtAuth, findProduct);
protectedRoute.get("/findproductby_id/:", jwtAuth, findProductBy_ID);
protectedRoute.put("/productupdate/:_id", jwtAuth, updateProduct);
protectedRoute.delete("/productdelete", jwtAuth, deleteProduct);
protectedRoute.delete("/delelte:/allproduct", jwtAuth, deleteAllProducts);
protectedRoute.put(
  "/update/product/purchased:/",
  jwtAuth,
  updateProductPurchased,
  userUpdateCallback
);
export default protectedRoute;
