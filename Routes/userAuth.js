import express from "express";
import { jwtAuth } from "../utils/auth.js";
import { display } from "../Controllers/addProduct.js";
import { findProduct } from "../Controllers/displayProduct.js";
import { findProductBy_ID } from "../Controllers/displayProduct.js";

const protectedRoute = express.Router();

protectedRoute.get("/addproducts", jwtAuth, display);
protectedRoute.get("/display_all", jwtAuth, findProduct);
protectedRoute.get("/findproductby_id/:", jwtAuth, findProductBy_ID);
export default protectedRoute;
