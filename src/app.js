const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Aayushi",
    lastName: "Dubey",
    age: 22,
    email: "aayushi@gmail.com",
  };

  const user = User(userObj);

  await user.save();

  res.send("user created successfully");
});

connectDb()
  .then(() => {
    console.log("database is connected successfully");

    app.listen(3000, () => {
      console.log(`server is started at port 3000`);
    });
  })
  .catch((err) => {
    console.log("connection failed...");
  });
