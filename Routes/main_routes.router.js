import express from "express";
import userRoute from "./user_router.router.js";
import protectedRoute from "./user_auth.router.js";
import { find_All_User } from "../Controllers/display_users.controller.js";
import { findUserBy_ID } from "../Controllers/display_users.controller.js";

const mainRoute = express.Router();
mainRoute.use("/user", userRoute);
mainRoute.use("/auth", protectedRoute);
mainRoute.get("/all_users", find_All_User);
mainRoute.get("/users/Id:", findUserBy_ID );

export default mainRoute;
