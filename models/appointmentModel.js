const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  date: {
    type: Date,
    required : true
  },
  isCanceled: {
    type: Boolean,
    default: false,
  },
  observations: [
    {
      type: String,
    },
  ],
  prescriptions: [
    {
      name: {
        type: String,
        required: true,
      },
      dosage: {
        type: String,
        required: true,
      },
    },
  ],
  time: {
    type: Number,
  },
  rescheduled: {
    type: Boolean,
    default: false,
  },
  consent: {
    type: Boolean,
    default: false,
  },
  concluded: {
    type: Boolean,
    default: false,
  },
});

module.exports = new mongoose.model("Appointment", appointmentSchema);
