const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://piyushdubey9587:Piyush826914@cluster0.4l63zsg.mongodb.net/"
  );
};

module.exports = connectDb;
