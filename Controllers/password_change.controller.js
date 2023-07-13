//model imports
import { userModel } from "../database/mongodb.model/user.model.js";
import { otpModel } from "../database/mongodb.model/otp.model.js";
//import 3-partypackages
import bcrypt from "bcrypt";

export const changeUserPassword = async (req, res) => {
  //query destructureing
  const { otp, user_id, new_password } = req.query;
  //password hashing
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(new_password, salt);
  //otp validation
  const otpvalidation = async () => {
    await otpModel
      .findOne({ user_id: user_id })
      .then((response) => {
        //validating otp
        response.otp_sent == otp
          ? userModel
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
              })
          : res.send({ message: "invalid otp" });
      })
      .catch((err) => {
        res.send({ error: JSON.stringify(err) });
      });
  };
  //function call
  otpvalidation();
};
