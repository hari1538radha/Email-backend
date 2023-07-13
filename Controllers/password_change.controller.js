//model imports
import { userModel } from "../database/mongodb.model/user.model.js";
//import 3-partypackages
import bcrypt from "bcrypt";

export const changeUserPassword = async (req, res) => {
  //query destructureing
  const {user_id, new_password } = req.query;
  //password hashing
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(new_password, salt);
  //otp validation
  const otpvalidation = async () => {
   await userModel
      .updateOne(
        { _id: user_id },

        {
          $set: {
            userPassword: hashedPassword,
          },
        }
      )
      .then((response) => {
        res.send({
          message: "updated successfully",
          product: response,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  };
  //function call
  otpvalidation();
};
