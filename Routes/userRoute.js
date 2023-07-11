import express from "express"
import { Login } from "../Controllers/Login.js"
import { Signup } from "../Controllers/Signup.js"

const userRoute = express.Router();

userRoute.post("/login", Login);
userRoute.post("/signup", Signup);
export default userRoute;