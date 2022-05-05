const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Signup user
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
      status: "active",
    });
    await newUser.save();
    res.status(201).json({
      message: "Signup was successfully",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Signup was not successfully",
      error: err.message,
    });
  }
});

//Login user
router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });

    if (user && user.length > 0) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isPasswordValid) {
        const token = jwt.sign(
          {
            username: user[0].username,
            name: user[0].name,
            status: user[0].status,
            userID: user[0]._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          access_token: token,
          message: "Login was successfully",
          data: user[0],
        });
      } else {
        res.status(401).json({
          error: "Invalid credentials",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication failed",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Authentication failed",
      error: err.message,
    });
  }
});

//module export
module.exports = router;
