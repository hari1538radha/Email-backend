import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.secretKey;
//jwt token genration
export const token = ({ userName, userPassword }) => {
  return jwt.sign(
    { userName: userName, userPassword: userPassword },
    secretKey,
    { expiresIn: "10hr" }
  );
};

export const otp_token =    async({ user_id, otp }) => {
  console.log(user_id,otp)
  return jwt.sign(
    {
      user_id: user_id,
      OTP: otp,
    },
    secretKey,
    { expiresIn: "10hr" }
  );
};
//jwt token validation
export const jwtAuth = async (req, res, next) => {
  try {
    //const declaration
    const { userName } = req.query;
    const authTokenHeader = req.headers["authorization"];
    const token = authTokenHeader && authTokenHeader.split(" ")[1];
    if (token == null) {
      res.send({ status: 404, message: "token required to access this page" });
    } else {
      //jwt token verification
     await jwt.verify(token, secretKey, (err, response) => {
        if (err) {
          if (JSON.stringify(err).name == "TokenExpiredError") {
            return res.send({
              status: 401,
              message: response.message + response.expiredAt,
            });
          } else {
            return res.send(JSON.stringify(err));
          }
        }
        if (response.userName == userName) {
          //   res.send(JSON.stringify(response));
          return next();
        } else {
          res.send("invalid Login credentials");
        }
      });
    }
  } catch (error) {
    res.send(JSON.stringify(error));
  }
};
export const otpjwtAuth = async (req, res, next) => {
  try {
    //const declaration
    const { otp } = req.query;
    const authTokenHeader = req.headers["authorization"];
    const otptoken = authTokenHeader && authTokenHeader.split(" ")[1];
    console.log(otptoken);
    if (token == null) {
      res.send({ status: 404, message: "password change failure" });
    } else {
      //jwt token verification
    await jwt.verify(otptoken, secretKey, (err, response) => {
        console.log(response);
        if (err) {
          if (JSON.stringify(err).name == "TokenExpiredError") {
            return res.send({
              status: 401,
              message: response.message + response.expiredAt,
            });
          } else {
            return res.send(JSON.stringify(err));
          }
        } else {
          if (response.OTP == otp) {
            return next();
          } else {
            res.send("invalid Login credentials");
          }
        }
      });
    }
  } catch (error) {
    res.send(JSON.stringify(error));
  }
};
