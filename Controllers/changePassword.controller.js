import { userModel } from "../database/schema/userSchema.js";
import { otpModel } from "../database/schema/otp.schema.js";
import bcrypt from "bcrypt";

export const changeUserPassword = async (req, res, next) => {
  const { otp, user_id, new_password } = req.query;
  // res.send(response)
  const hashedPassword = await bcrypt.hash(new_password, 12);
  const otpvalidation = async () => {
    await otpModel
      .findOne({ user_id: user_id })
      // .populate("user_id")
      .then((response) => {
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
        // response ? res.send("user found") : res.send("user not found");
      })
      .catch((err) => {
        res.send({ error: JSON.stringify(err) });
      });
  };
  otpvalidation();
};
