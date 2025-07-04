const express = require('express')
const UserData = require('../models/data_model')

const checkToken = require('../checkToken')

const routes = express.Router()

const { v2: cloudinary } = require('cloudinary')

const dotenv = require('dotenv')
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
})

routes.post('/add', checkToken.cToken, async (req, res) => {
  try {
    if (!req.files || !req.files.picture) {
      return res.status(400).json({
        message: 'Picture file is required'
      })
    }

    const file = req.files.picture

    // Upload to cloudinary with async/await
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'home_rental',
      resource_type: 'auto'
    })

    const roomData = new UserData({
      username: req.body.username,
      owner: req.body.owner,
      rent: req.body.rent,
      size: req.body.size,
      address: req.body.address,
      city: req.body.city,
      apartment: req.body.apartment,
      phone: req.body.phone,
      likes: req.body.likes || [],
      picture: result.secure_url,
      description: req.body.description,
      available: req.body.available !== undefined ? req.body.available : true
    })

    await roomData.save()

    console.log('Room data saved:', roomData)

    res.status(201).json({
      message: 'Data added successfully',
      data: roomData
    })
  } catch (err) {
    console.error('Error uploading data:', err)
    res.status(500).json({
      message: 'Data Uploading failed',
      error: err.message
    })
  }
})

// Get all posts
routes.get('/', async (req, res) => {
  try {
    const posts = await UserData.find().sort({ createdAt: -1 })
    res.status(200).json({
      message: 'Posts retrieved successfully',
      data: posts
    })
  } catch (err) {
    console.error('Error retrieving posts:', err)
    res.status(500).json({
      message: 'Failed to retrieve posts',
      error: err.message
    })
  }
})

// Get single post by ID
routes.get('/:id', async (req, res) => {
  try {
    const post = await UserData.findById(req.params.id)
    if (!post) {
      return res.status(404).json({
        message: 'Post not found'
      })
    }
    res.status(200).json({
      message: 'Post retrieved successfully',
      data: post
    })
  } catch (err) {
    console.error('Error retrieving post:', err)
    res.status(500).json({
      message: 'Failed to retrieve post',
      error: err.message
    })
  }
})

module.exports = routes
