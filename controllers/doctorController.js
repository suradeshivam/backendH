const axios = require("axios");
const Doctor = require("../models/doctorModel");

const doctorRegister = async (req, res) => {
  const { name, email, password, mobile, address } = req.body;
  try {
    const doctor = await Doctor.create(req.body);

    res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const doctorLogin = async (req, res) => {
  const { email, password } = req.body;
  const doctor = await Doctor.findOne({ email: email });
  console.log(doctor);

  if (doctor.password === password) {
    res.status(200).json({
      success: true,
      doctor,
    });
  } else {
    res.status(500).json({
      success: false,
      error: "invalid password",
    });
  }
};

module.exports = { doctorRegister, doctorLogin };
