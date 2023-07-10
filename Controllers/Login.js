import { userModel } from "../database/schema/schema.js";
import bcrypt from "bcrypt";

export const Login = async (req, res) => {
  const { UserName, Password } = req.body;
  console.log(req.body);
  const user = await userModel.find({ UserName: UserName });
  const userdata = new userModel(req.body);
    const salt = await bcrypt.genSalt(10);
  userdata.Password = await bcrypt.hash(userdata.Password, salt);
  if (user) {
    // userdata
    //   .save()
    //   .then((data) => {
    //     res.write(data);
    //   })
    //   .catch((err) => {
    //     res.write(JSON.stringify(err));
    //   });

    console.log(user);
    res.status(200).send(user);
   
  } else {
    res.send("no user found");
  }
};
