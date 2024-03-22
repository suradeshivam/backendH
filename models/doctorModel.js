const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  documents: [
    {
      name: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        enum: ["MBBS", "BHMS", "BAMS"],
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
    },
  ],
  address: {
    line1: {
      type: String,
      required: true,
    },
    line2: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    contry: {
      type: String,
      required: true,
    },
  },
  appointements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  notifications: [
    {
      type: String,
      enum: ["reminder", "report"],
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = new mongoose.model("Doctor", doctorSchema);
