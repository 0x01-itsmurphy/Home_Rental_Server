const express = require("express");

const User = require("../models/user_model");

const UserData = require("../models/data_model");

const routes = express.Router();


// Delete user
routes.delete("/delete/:username", async (req, res) => {
  try {
    User.findOneAndDelete({ username: req.params.username }, (err, user) => {
      if (user) {
        res.status(200).json({
          message: "User deleted successfully",
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    });
  } catch (error) {
    console.log("An Error " + error.message);
  }
});

// Check USERNAME
routes.get("/checkusername/:username", (req, res) => {
  User.findOne({ username: req.params.username }, (err, result) => {
    if (err) return res.status(500).json({ msg: err });
    if (result !== null) {
      return res.json({
        Status: true,
        message: "Username already exist",
      });
    } else
      return res.json({
        Status: false,
        message: "Username available for use",
      });
  });
});


// Get All Users Data
routes.get("/getallusers", async (req, res) => {
  try {
    const users = await UserData.find({});
    res.status(200).json({
      message: "All users data",
      users,
    });
  } catch (error) {
    console.log("An Error " + error.message);
  }
});

module.exports = routes;
