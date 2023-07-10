import moongose from "mongoose";

export const UserSchema = new moongose.Schema({
  UserName: {
    requires: true,
    type: String,
  },
  Password: {
    requires: true,
    type: String,
  },
});

export const userModel = new moongose.model("user_login",UserSchema);
