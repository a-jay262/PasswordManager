const mongoose = require("mongoose");

const passSchema = mongoose.Schema(
  {
    email: String,
    identity: String,
    encryptedPassword: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Passwords", passSchema);
