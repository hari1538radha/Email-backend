import express from "express";
import { Login } from "../Controllers/login.controller.js";
import { Signup } from "../Controllers/signup.controller.js";
import { userOTPMessaging } from "../Controllers/otp_message.controller.js";
import { changeUserPassword } from "../Controllers/password_change.controller.js";
import { otpjwtAuth } from "../utils/jwt.auth.js";
import { addUser } from "../Controllers/adduser.sql.js";
const userRoute = express.Router();

userRoute.post("/login", Login);
userRoute.post("/signup", Signup);
userRoute.post("/otp:/sendotp", userOTPMessaging);
userRoute.put("/changepassword", otpjwtAuth, changeUserPassword);
userRoute.post("/signup/sql", addUser);
export default userRoute;
