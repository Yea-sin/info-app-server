const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userSchema = require("../Schema/userSchema");
const UsersCollection = new mongoose.model("UsersCollection", userSchema);

router.post("/singup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new UsersCollection({
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "Signup was successful!",
    });
  } catch {
    res.status(500).json({
      message: "Signup failed!",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await UsersCollection.find({ email: req.body.email });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id,
          },
          "hizhizzhuzhuzzz",
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          accessToken: token,
          message: "login successful",
        });
      } else {
        res.status(401).json({
          message: "authorization failed",
        });
      }
    } else {
      res.status(401).json({
        message: "authorization failed",
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "authorization failed",
    });
  }
});

/* router.post("/login", async (req, res) => {
  try {
    const user = await UsersCollection.find({ email: req.body.email });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );

      if (isValidPassword) {
        // generate token
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id,
          },
          "hizhizzhuzhuzzzsddascf",
          {
            expiresIn: "1h",
          }
        );

        res.status(200).json({
          access_token: token,
          message: "Login successful!",
        });
      } else {
        res.status(401).json({
          error: "Authetication failed!",
        });
      }
    } else {
      res.status(401).json({
        error: "Authetication failed!",
      });
    }
  } catch {
    res.status(401).json({
      error: "Authetication failed!",
    });
  }
}); */

module.exports = router;
