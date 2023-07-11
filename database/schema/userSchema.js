import moongose from "mongoose";

export const UserSchema = new moongose.Schema({
  userName: {
    requires: true,
    type: String,
  },
  userPassword: {
    requires: true,
    type: String,
  },
  contact_Number:{type:Number}
});

export const userModel = new moongose.model("user_login",UserSchema);
