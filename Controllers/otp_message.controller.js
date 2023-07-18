//Model imports
import { userModel } from "../database/mongodb.model/user.model.js";
//import twilio
import Twilio from "twilio";
//otp_token import
import { otp_token } from "../utils/jwt.auth.js";
export const userOTPMessaging = async (req, res) => {
  const accountSid = process.env.TWILLIO_ACCOUNT_SID;
  const authToken = process.env.TWILLIO_AUTH_TOKEN;
  const phonenumber = process.env.TWILLIO_PHONENUMBER;

  const client = Twilio(accountSid, authToken);

  const { user_id, contact_Number } = req.query;
  //otp generation
  const generateOTP = () => {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };
  const otp = generateOTP();
  const token = await otp_token({ user_id, otp });

  try {
    const otpmessaging = async () => {
      //sending otp
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
                  console.log({ token }, "token");
                  res.send({
                    message: "otp sent successfully",
                    token: token,
                  });
                })
            : res.send({ message: "invalid phone number" });
        })
        .catch((err) => {
          return res.send(err);
        });
    };
    otpmessaging();
  } catch (error) {}
};
