const express = require("express");
const router = express.Router();
const passController = require("../controllers/passwordcontroller");

router.post("/passwords", passController.sendPassword);
router.delete("/delete", passController.deletePassword);
router.get("/getallpasswords", passController.getAllIdentities);
router.get("/decryptpassword/:identity", passController.decryptPassword);



module.exports = router;
