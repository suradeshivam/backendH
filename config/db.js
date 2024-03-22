const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `Mongodb is connected on host ${(await conn).connection.host} `
    );
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDB;
