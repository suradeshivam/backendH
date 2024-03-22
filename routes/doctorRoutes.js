const express = require("express");
const {
  doctorRegister,
  doctorLogin,
} = require("../controllers/doctorController");

const router = express.Router();

router.route("/").post(doctorRegister);
router.route("/login").post(doctorLogin);

module.exports = router;
