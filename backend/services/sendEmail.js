const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const generateOTP = require("./generateOTP");
dotenv.config();

let otps = String;

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    const otp = generateOTP();
    otps = otp;
    var mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "OTP from Callback Coding",
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");

    res.status(200).send("Email sent successfully!"); // Send success response
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email"); // Send error response
  }
});

const verifyOTP = (req, res) => {
  console.log(otps);
  console.log("AND");
  const enteredOTP = req.body.otp; // Access OTP value from the request body
  console.log(enteredOTP);
  // Compare the entered OTP with the one stored in otps
  if (otps === enteredOTP) {
    res.send("OTP Verified Successfully!");
  } else {
    res.status(400).send("Invalid OTP");
  }
};


module.exports = { sendEmail, verifyOTP };
