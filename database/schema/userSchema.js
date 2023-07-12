import moongose, { Schema } from "mongoose";

export const UserSchema = new moongose.Schema({
  userName: {
    requires: true,
    type: String,
  },
  userPassword: {
    requires: true,
    type: String,
  },

  product_id: [{
    type: moongose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  }],
  quantity: {
    type: Number,
    required: true,
  },

  contact_Number: { type: Number },
});

export const userModel = new moongose.model("user_login", UserSchema);
