import { userModel } from "../database/schema/schema.js";
import bcrypt from "bcrypt";

export const Signup = async (req, res) => {
  const { UserName, Password } = req.body;
  console.log(req.body);
  const userdata = new userModel(req.body);
  const salt = await bcrypt.genSalt(10);

  userdata.Password = await bcrypt.hash(userdata.Password, salt);
 await userModel.findOne({ UserName: UserName }).then((data) => {
    console.log(data)
      if (data.UserName == UserName) {
        res.send("user already exist");
      } else {
        userdata
          .save()
          .then(() => {
            res.status(200).send("user signup success");
          })
          .catch((err) => {
            res.send(JSON.stringify(err));
          });
      }
    }).catch((error) => {
      res.send(error);
    });
};
