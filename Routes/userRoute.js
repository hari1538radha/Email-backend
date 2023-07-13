import express from "express"
import { Login } from "../Controllers/Login.js"
import { Signup } from "../Controllers/Signup.js"
import { userOTPMessaging } from "../Controllers/otpMessage.controller.js";
import { changeUserPassword } from "../Controllers/changePassword.controller.js";

const userRoute = express.Router();

userRoute.post("/login", Login);
userRoute.post("/signup", Signup);
userRoute.post("/otp:send&set/",userOTPMessaging)
userRoute.post("/changepassword",changeUserPassword)
// userRoute.get("/")
export default userRoute;