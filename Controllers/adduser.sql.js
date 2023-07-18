import user_model from "../database/model/user.model.js";
import bcrypt from "bcrypt";
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
            message: `user added with id:${response.getDataValue('id')}`,
            response: response[0],
          });
        })
        .catch((err) => {
          res.send({ message: "error", error: err });
        });
};
