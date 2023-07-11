import express from "express";
import { jwtAuth } from "../utils/auth.js";
import { display } from "../Controllers/Display.js";

const protectedRoute = express.Router();

protectedRoute.get("/protected", jwtAuth, display);

export default protectedRoute;
