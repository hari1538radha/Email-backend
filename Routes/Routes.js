import express from "express";
import {Login} from "../Controllers/Login.js";
import { Signup } from "../Controllers/Signup.js";
const Route = express.Router();
const userRoute = Route.use("/user")
userRoute.get("/Login", Login);
userRoute.get("/Signup", Signup);

export default Route;
