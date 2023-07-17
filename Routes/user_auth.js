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
import { display_actors } from "../Controllers/displayactor_sql_contoller.js";
import { display_actorbyName } from "../Controllers/displayactor_sql_contoller.js";
import { addProduct } from "../Controllers/addproducts_sql.controller.js";
import { display_product } from "../Controllers/addproducts_sql.controller.js";
import { delete_product } from "../Controllers/addproducts_sql.controller.js";
import { delete_productById } from "../Controllers/addproducts_sql.controller.js";
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
protectedRoute.get("/sql/actor_byname", jwtAuth, display_actorbyName);
protectedRoute.get("/sql/actor_diplay", jwtAuth, display_actors);
protectedRoute.post("/sequelize/addproduct", jwtAuth, addProduct);
protectedRoute.get("/sequalize/display_product", jwtAuth, display_product);
protectedRoute.delete("/deleteAll", jwtAuth, delete_product);
protectedRoute.delete("/delete:id/product/:id", jwtAuth, delete_productById);
export default protectedRoute;
