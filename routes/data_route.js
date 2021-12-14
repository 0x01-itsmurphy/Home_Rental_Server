const express = require("express");
const UserData = require("../models/data_model");

const checkToken = require("../checkToken");

const routes = express.Router();

var cloudinary = require("cloudinary").v2;
const console = require("console");

const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

routes.post("/add", checkToken.cToken, async (req, res) => {
  try {
    const file = req.files.picture;
    cloudinary.uploader.upload(file.tempFilePath, function (error, result) {
      console.log(result);

      const roomData = new UserData({
        username: req.body.username,
        owner: req.body.owner,
        rent: req.body.rent,
        size: req.body.size,
        address: req.body.address,
        city: req.body.city,
        apartment: req.body.apartment,
        phone: req.body.phone,
        likes: req.body.likes,
        picture: result.secure_url,
        description: req.body.description,
        available: req.body.available,
      });

      roomData.save();

      console.log(roomData);

      res.status(200).json({
        message: "Data added successfully",
        data: roomData,
      });
    });

    // res.json(roomData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Data not added",
    });
  }
});

module.exports = routes;
