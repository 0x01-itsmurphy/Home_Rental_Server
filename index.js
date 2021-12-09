var http = require("http");
var dt = require("./first");

// --------------------using nodeJs
// http
//   .createServer(function (req, res) {
//     res.writeHead(200, { "Content-type": "text/html" });
//     // res.write("Current date time is: " + dt.myDateTime());
//     res.write(req.url);
//     res.end();
//   })
//   .listen(5000);

// -------------------------using Express --------- --

// import express, { Request, Response } from "express";

const express = require("express");
const mongoose = require("mongoose");
// const User = require("../models/User");

const userRoute = require("./routes/user_route");

var app = express();
var port = process.env.port || 8000;
var MONGO_URL =
  "mongodb+srv://bella:mongodbtest@cluster0.fszhg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// MiddleWare
middleware = async () => {
  app.use(express.urlencoded({extended: false}));
  app.use(express.json({extended: false}));

  app.use("/", userRoute);
  app.use('/api/auth/signin', userRoute);
  app.use('/api/auth/signup', userRoute);
};

//Function to connect MongoDB
const connectMongoose = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
      bufferCommands: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error while Connecting to MongoDB");
  }
};

// app.get("/", (req, res) => {
//   res.send("Api Running");
// });

const listenToPort = async () => {
  app.listen(port, () => {
    console.log("Server Running Port " + port);
  });
};

// Trigger Functions
listenToPort().then(() => {
  middleware().then(() => {
    connectMongoose();
  });
});
