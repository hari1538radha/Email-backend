import { userModel } from "../database/schema/userSchema.js";
import { otpModel } from "../database/schema/otp.schema.js";

import Twilio from "twilio";
export const userOTPMessaging = async (req, res) => {
  const accountSid = process.env.TWILLIO_ACCOUNT_SID;
  const authToken = process.env.TWILLIO_AUTH_TOKEN;
  const phonenumber = process.env.TWILLIO_PHONENUMBER;
  const client = Twilio(accountSid, authToken);

  const { user_id, contact_Number } = req.query;
  const generateOTP = () => {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  const otp = generateOTP();
  await userModel
    .findOne({ _id: user_id })
    .then((response) => {
      response.contact_Number == contact_Number
        ? client.messages
            .create({
              body: `your OTP for password change is :${otp}`,
              from: phonenumber,
              to: `+91${contact_Number}`,
            })
            .then((result) => {
              const save_otp = async () => {
                console.log(otp, user_id);
                const newOTP = new otpModel({
                  otp_sent: otp.toString(),
                  user_id: user_id,
                });
                await newOTP
                  .save()
                  .then((response) => {
                    return (
                      res.send({
                        message: "otp saved",
                        response: response,
                      })
                      // next(response)
                    );
                  })
                  .catch((error) => {
                    return res.send({
                      message: "otp saving failed",
                      error: error,
                    });
                  });
              };
              save_otp(), console.log(result);
            })
        : res.send({ message: "invalid phone number" });
    })
    .catch((err) => {
      return res.send(err);
    });
};
