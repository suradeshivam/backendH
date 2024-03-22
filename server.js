const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const user = require("./routes/userRoutes");
const appointment = require("./routes/appointementRoutes");
const doctor = require("./routes/doctorRoutes");

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.use("/api/user", user);
app.use("/api/appointment", appointment);
app.use("/api/doctor", doctor);

app.listen(process.env.PORT, () => {
  console.log(`server is listening on ${process.env.PORT}`);
});
