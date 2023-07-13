import mongoose from "mongoose";
export const otp_Scehma = new mongoose.Schema({
  otp_sent: {
    type: String,
    required: true,
    min: 1,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_user_login",
    required: true,
  },
});
export const otpModel = new mongoose.model("otp_collection", otp_Scehma);
