import express from "express"
import { Login } from "../Controllers/login.controller.js"
import { Signup } from "../Controllers/signup.controller.js"
import { userOTPMessaging } from "../Controllers/otp_message.controller.js";
import { changeUserPassword } from "../Controllers/password_change.controller.js";

const userRoute = express.Router();

userRoute.post("/login", Login);
userRoute.post("/signup", Signup);
userRoute.post("/otp:send&set/",userOTPMessaging)
userRoute.put("/changepassword",changeUserPassword)

export default userRoute;