const express = require("express");
const {
  createAppointment,
  getAllAppointments,
} = require("../controllers/appointmentController");

const router = express.Router();

router.route("/:id").get(getAllAppointments);
router.route("/create").post(createAppointment);
// router.route("/login").post(userLogin);

module.exports = router;
