const express = require("express");
const connectDb = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { firstName, lastName, age, email, password } = req.body;

  // Hash Password

  const hashPassword = await bcrypt.hash(password, 10);

  const user = User({
    firstName,
    lastName,
    age,
    email,
    password: hashPassword,
  });

  try {
    await user.save();

    res.send("user created successfully");
  } catch (error) {
    res.status(400).send("Something Went Wrong");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);
    if (isPasswordValid) {
      res.send("Login successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("something went wrong" + " " + error);
  }
});

app.get("/user", async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(400).send("Something Went Wrong");
  }
});

app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.send("user deleted successfully");
    }
  } catch (error) {
    res.status(400).send("Something Went Wrong");
  }
});

app.patch("/user", async (req, res) => {
  try {
    const data = req.body;
    const userId = req.body.userId;

    const user = await User.findByIdAndUpdate({ _id: userId }, { data });
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.send("user updated successfully");
    }
  } catch (error) {
    res.status(400).send("Something Went Wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.status(404).send("users not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something Went Wrong");
  }
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
