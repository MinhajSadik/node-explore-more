const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../schemas/userSchema");
const bcrypt = require("bcrypt");

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
module.exports = router;
