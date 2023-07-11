import { userModel } from "../database/schema/schema.js";
import bcrypt from "bcrypt";

export const Signup = async (req, res) => {
  try {
    //destructuring
    const { userName, userPassword } = req.body;
    //new user object
    const userdata = new userModel(req.body);
    //encryption key
    const salt = await bcrypt.genSalt(10);
    //pasword hashing
    userdata.userPassword = await bcrypt.hash(userdata.userPassword, salt);

    const existingUser = await userModel.findOne({ userName: userName });
    if (!existingUser) {
      userdata
        .save()
        .then(() => {
          return res.status(200).json("user signup success");
        })
        .catch((err) => {
          res.send(JSON.stringify(err));
        });
    } else {
      return res.status(403).json("message:User already exist");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
