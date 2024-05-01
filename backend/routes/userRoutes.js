const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");

router.post("/signUp", userController.signUp);
router.post("/logIn", userController.logIn);

module.exports = router;
