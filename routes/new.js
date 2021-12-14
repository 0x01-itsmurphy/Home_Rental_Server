const express = require("express");
const res = require("express/lib/response");

const UserData = require("../models/data_model");

const checkToken = require("../checkToken");

//export all user data to json

const routes = express.Router();


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./uploads");
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + file.originalname);
//     },
//   }),
//   upload = multer({
//     storage: storage,

//     limits: { fileSize: 1000000 },
//     fileFilter: function (req, file, cb) {
//       if (
//         file.mimetype == "image/png" ||
//         file.mimetype == "image/jpg" ||
//         file.mimetype == "image/jpeg"
//       ) {
//         cb(null, true);
//       } else {
//         cb(null, false);
//         return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
//       }
//     },
//   });


routes.get("/", (req, res) => {
  res.send("--------------------- Test Route --------------------- ");
});

routes.all("/bla/bla", async (req, res) => {
  res.send("---------- route Route");
});

module.exports = routes;
