const Appointment = require("../models/appointmentModel");
const axios = require("axios");

const createAppointment = async (req, res) => {
  console.log("in appointment controller");
  const { patient, doctor, date, rescheduled, consent } = req.body;
  console.log(patient, doctor, date);

  if (!(patient && doctor && date)) {
    console.log("info error");
    console.log("enter all details");
    res.status(404).json({
      success: false,
      message: "provide all details",
    });
    return;
  }
  console.log(1);

  try {
    var appointment = await Appointment.create(req.body);
    console.log(2);
    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllAppointments = async (req, res) => {
  const type = "D";
  if (type === "D") {
    const appointments = await Appointment.find({ doctor: req.params.id })
      .populate("patient", "-password")
      .populate("doctor", "-password");

    res.status(200).json({
      success: true,
      appointments,
    });
  } else {
    console.log(req.body);
    console.log(req.params);
    res.status(500).json({
      message: "not done till now",
    });
  }
};

module.exports = { createAppointment, getAllAppointments };
