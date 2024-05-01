const express = require("express");
const router = express.Router();

const { sendEmail, verifyOTP } = require("../services/sendEmail");

router.post("/sendEmail", sendEmail);
router.post("/verify-otp", verifyOTP);

module.exports = router;
