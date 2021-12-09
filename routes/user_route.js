const express = require("express");

const User = require("../models/user_model");

const bcrypt = require("bcrypt");                   // to encrypt the password to hash

const routes = express.Router();

routes.get("/", (req, res) => {
  res.send("This is the First API Route");
});

// SignIn Route
routes.post("/api/auth/signin", async (req, res) => {
  try {
    // if (req.body.password != null) {
      if (req.body.email != null) {

        // check if user already exist
        const user = await User.findOne({ email: req.body.email });
        !user &&
          res.status(404).json({
            message: "User does not exist, please register.",
          });

          //validating password which is created
          const validPassword = await bcrypt.compare(req.body.password, user.password)
          !validPassword && res.status(404).json({
            message: "Invalid Password"
          });

        if (user != null) {
          res.json({
            message: "Login Success",
            body: user,
          });
        }
      } else {
        res.status(400).json({
          message: "Email is Required",
        });
      }
    // } else {
    //   res.status(400).json({
    //     message: "Password is Required",
    //   });
    // }
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
      if (req.body.email != null) {
        const user = await new User({
          name: req.body.name,
          email: req.body.email,
          password: hashPassword,
        });
        //Save or send data to the MongoDB collection
        await user.save();
        //Return Json
        res.json({
          message:"Successfully Registerd",
          token: hashPassword
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
  //Default Return 👇
  // res.send("SignUp/Register Page Route");
});

routes.get("/api/files", (req, res) => {
  res.send("Get All the Files");
});

routes.get("/api/files/:filename", (req, res) => {
  res.send("Get Specific File");
});

// we have to export the routes
module.exports = routes;
