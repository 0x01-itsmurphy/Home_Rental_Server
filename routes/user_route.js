const express = require("express");
const User = require("../models/user_model");
const config = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");// to encrypt the password to hash

const checkToken = require("../checkToken");
const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("This is the First API Route");
});

// user profile details
routes.get("/api/auth/:username", checkToken.cToken, (req, res) => {
  User.findOne({ username: req.params.username }, (err, user) => {
    if (err) {
      res.status(500).json({
        message: "Error in finding the user",
      });
    } else {
      if (user) {
        res.status(200).json({
          message: "User found",
          user: user,
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    }
  });
});

// SignIn Route
routes.post("/api/auth/signin", async (req, res) => {
  try {
    if (req.body.username != null) {
      // check if user already exist
      const user = await User.findOne({ username: req.body.username });
      !user &&
        res.status(404).json({
          message: "User does not exist, please register.",
        });

      //validating password which is created
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      !validPassword &&
        res.status(404).json({
          message: "Invalid Password",
        });

      if (validPassword) {
        const token = jwt.sign({ _id: user._id }, config.key, {
          expiresIn: "15m",
        });
        res.header("auth-token", token).json({
          message: "User logged in successfully",
          token: token,
          user: user,
        });
      }
    } else {
      res.status(400).json({
        message: "Username is Required",
      });
    }
  } catch (error) {
    console.log("An Error " + error.message);
  }
});

// SignUp Route
routes.post("/api/auth/signup", async (req, res) => {
  try {
    if (req.body.password != null) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);
      const emailExist = await User.findOne({ email: req.body.email });
      // emailExist && res.status(400).json({ message: "Email already exist" });
      const usernameExist = await User.findOne({ username: req.body.username });
      // usernameExist && res.status(400).json({ message: "Username already exist" });

      if(emailExist || usernameExist){
        res.status(400).json({
          message: "Email or Username already exist"
        })
      }      

      if (req.body.email != null) {
        const user = await new User({
          username: req.body.username,
          email: req.body.email,
          password: hashPassword,
        });
        //Save or send data to the MongoDB collection
        await user.save();
        //Return Json
        res.status(200).json({
          message: "Successfully Registerd",
          token: hashPassword,
        });
      } else {
        res.status(400).json({
          message: "Email is Required",
        });
      }
    } else {
      res.status(400).json({
        message: "Password is Required",
      });
    }
  } catch (error) {
    console.log("An Error " + error.message);
  }
});



routes.get("/api/users",checkToken.cToken , async (req, res) => {
  res.send("Get All the Files");
});

routes.get("/api/files/:filename", (req, res) => {
  res.send("Get Specific File");
});

// we have to export the routes
module.exports = routes;
