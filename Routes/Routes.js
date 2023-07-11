import express from "express";
import userRoute from "./userRoute.js";
import protectedRoute from "./userAuth.js";
import { find_All_User } from "../Controllers/user.js";
import { findUserBy_ID } from "../Controllers/user.js";

const mainRoute = express.Router();
mainRoute.use("/user", userRoute);
mainRoute.use("/auth", protectedRoute);
mainRoute.get("/all_users", find_All_User);
mainRoute.get("/users/Id:", findUserBy_ID );

export default mainRoute;
