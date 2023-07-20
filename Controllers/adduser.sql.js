import user_model from "../database/model/user.model.js";
import bcrypt from "bcrypt";
import { token } from "../utils/jwt.auth.js";
export const addUser = async (req, res) => {
  const { username, password, email, isAdmin } = req.body;
  const salt = await bcrypt.genSalt(12);
  const hashed_password = await bcrypt.hash(password, salt);
  isAdmin
    ? await user_model
        .create({
          username: username,
          password: hashed_password,
          email: email,
          isAdmin: isAdmin,
        })
        .then((response) => {
          res.send({
            message: `user added with id:${response.getDataValue("id")} `,
            response: response[0],
          });
        })
        .catch((err) => {
          res.send({ message: "error", error: err });
        })
    : await user_model
        .create({
          username: username,
          password: hashed_password,
          email: email,
          isAdmin: false,
        })
        .then((response) => {
          res.send({
            message: `user added with id:${response.getDataValue("id")}`,
            response: response[0],
          });
        })
        .catch((err) => {
          res.send({ message: "error", error: err });
        });
};

export const userLogin = async (req, res) => {
  var isvalid;
  const { email, password } = req.query;
  const user = await user_model.findOne({ where: { email: email } });
  if (!user) {
    res.send({ message: `user with email:${email} not found` });
  } else {
    isvalid = await bcrypt.compare(password,user.getDataValue('password'));
    console.log(isvalid)
    if (!isvalid) {
      res.send({ message: "invalid password" });
    } else {
      const jwttoken = token(email, password);
      res.send({ message: "login succes ", token: jwttoken });
    }
  }
};
