const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Enter Email"],
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: [true, "Please enter Mobile Number"],
  },
  documents: [
    {
      type: String,
    },
  ],
  address: {
    line1: {
      type: String,
      required: [true, "line 1 of address is required"],
    },
    line2: {
      type: String,
    },
    zipcode: {
      type: String,
      required: [true, "zipcode is required"],
    },
    city: {
      type: String,
      required: [true, "please enter city name"],
    },
    state: {
      type: String,
      required: [true, "please enter state"],
    },
    contry: {
      type: String,
      required: [true, "please enter contry"],
    },
  },
  age: {
    type: Number,
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
});

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    console.log(error);
    next(error);
  }

  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
