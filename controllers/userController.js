const axios = require("axios");
const multer = require("multer");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const userRegister = async (req, res) => {
  const { name, email, password, mobile, address } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({
      success: false,
      message: "User already exists",
    });
    return;
  }
  try {
    const user = await User.create(req.body);

    res.status(200).json({
      success: true,
      user,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      success: true,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(500).json({
      success: false,
      error: "invalid email or password",
    });
  }
};

const check = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "connected to backend successfully",
  });
};

// Update User Info
const updateInfo = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      res.status(400).json({
        success: false,
        message: "user not found",
      });
      return;
    }

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const uploadPdf = async (req, res) => {
  console.log(req.file);
  res.json({
    msg: "hi",
  });
};

module.exports = { userRegister, userLogin, updateInfo, check, uploadPdf };
