import { userModel } from "../database/schema/schema.js";
export const Login = async (req, res) => {
  const data = req.body;
  console.log(data);
  const user = await userModel.find({ UserName: data.Username });
  const userdata = new userModel(req.body);

  if (user) {
    userdata
      .save()
      .then((data) => {
        res.write(data);
      })
      .catch((err) => {
        res.write(JSON.stringify(err));
      });

    console.log(user);
    res.status(200).send(user);
    res.end();
  } else {
    res.send("no user found");
  }
};
