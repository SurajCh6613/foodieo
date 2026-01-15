import mongoose, { Mongoose } from "mongoose";

const otpSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otp: {
      type: String,
      required: true,
      expired: 300, // 5 Minute expiry
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const otpModel = mongoose.model("Otp", otpSchema);
export default otpModel;
