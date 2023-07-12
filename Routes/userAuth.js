import express from "express";
import { jwtAuth } from "../utils/auth.js";
import { display } from "../Controllers/addProduct.js";
import { findProduct } from "../Controllers/displayProduct.js";
import { findProductBy_ID } from "../Controllers/displayProduct.js";
import { updateProduct } from "../Controllers/updateProduct.js";
import { deleteProduct } from "../Controllers/deleteProduct.js";
import { deleteAllProducts } from "../Controllers/deleteProduct.js";
import { updateProductPurchased } from "../Controllers/purchaseProduct.js";
import { userUpdateCallback } from "../Controllers/purchaseProduct.js";

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
