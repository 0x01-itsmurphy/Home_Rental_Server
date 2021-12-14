const express = require("express");
const mongoose = require("mongoose");

const userRoute = require("./routes/user_route");
const dataRoute = require("./routes/data_route");
const crudRoute = require("./routes/crud_route");

const newRoute = require("./routes/new");

const dotenv = require("dotenv");

const fileUpload = require("express-fileupload");


dotenv.config();
var app = express();
var port = process.env.PORT || process.env.PORT || 80;
var MONGO_URL = process.env.MONGODB_URL;

// MiddleWare
middleware = async () => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json({ extended: false }));

  app.use(fileUpload({ useTempFiles: true }));

  app.use("/", userRoute);
  app.use("/api/auth/signin", userRoute);
  app.use("/api/auth/signup", userRoute);

  // app.use('/', dataRoute);
  app.use("/posts", dataRoute);
  app.use("/uploads", express.static("uploads"));

  // app.use(checkToken)

  app.use("/api", crudRoute);

  app.use("/", newRoute);
  app.use("/bla/bla", newRoute);
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
