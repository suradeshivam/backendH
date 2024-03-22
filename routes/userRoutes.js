const express = require("express");
const multer = require("multer");
const {
  userRegister,
  userLogin,
  updateInfo,
  check,
  uploadPdf,
} = require("../controllers/userController");

const router = express.Router();

console.log(1);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
console.log(2);
const upload = multer({ storage: storage });

router.route("/").get(check);
router.route("/").post(userRegister);
router.route("/login").post(userLogin);
router.route("/:id").put(updateInfo).post(upload.single("file"), uploadPdf);

module.exports = router;
