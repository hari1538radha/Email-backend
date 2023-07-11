import { userModel } from "../database/schema/schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config()
export const Login = async (req, res) => {
  //variable declaration
  const { userName, userPassword } = req.body;
  var valid;
  const secretKey = process.env.secretKey;
  try {
    //user validation
    const isValidUser = await userModel.findOne({ userName: userName });
    console.log(isValidUser);
    //password validation
    valid = await bcrypt.compare(userPassword, isValidUser.userPassword);
    console.log(await valid);

    if (!isValidUser) {
      return res.status(422).send({ message: "Invalid username or password" });
    } else {
      if (!(await valid)) {
        res.status(401).send({ message: "Invalid password" });
      } else {
        const token = jwt.sign(
          { userName: userName, userPassword: userPassword },
          secretKey,
          { expiresIn: "10h" }
        );
        res
          .status(200)
          .send({ status: 200, message: "login success", token: token });
      }
    }
  } catch (error) {
    res.send({ status: 500, message: error });
  }
};
