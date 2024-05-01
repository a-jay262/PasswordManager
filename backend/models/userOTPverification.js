const mongoose = require("mongoose");

const userOtpSchema = mongoose.Schema(
  {
    uId: String,
    OTP: String,
    createdAt: Date,
    expiredAt: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserOTP", userOtpSchema);
