import { userModel } from "../database/mongodb.model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { token } from "../utils/jwt.auth.js";

export const Login = async (req, res) => {
  //variable declaration
  const { userName, userPassword } = req.body;
  var valid;
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
        res.status(200).send({
          status: 200,
          message: "login success",
          token: await token({ userName, userPassword }),
        });
      }
    }
  } catch (error) {
    res.send({ status: 500, message: JSON.stringify(error) });
  }
};
