import express from "express";
import userRoute from "./userRoute.js";
import protectedRoute from "./userAuth.js";

const mainRoute = express.Router();
mainRoute.use("/user", userRoute);
mainRoute.use("/auth", protectedRoute);

export default mainRoute;
