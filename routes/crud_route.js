const express = require('express')

const User = require('../models/user_model')

const UserData = require('../models/data_model')

const routes = express.Router()

// Delete user
routes.delete('/delete/:username', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ username: req.params.username })
    if (user) {
      res.status(200).json({
        message: 'User deleted successfully'
      })
    } else {
      res.status(404).json({
        message: 'User not found'
      })
    }
  } catch (error) {
    console.log('An Error ' + error.message)
    res.status(500).json({
      message: 'Server error',
      error: error.message
    })
  }
})

// Check USERNAME
routes.get('/checkusername/:username', async (req, res) => {
  try {
    const result = await User.findOne({ username: req.params.username })
    if (result !== null) {
      return res.json({
        Status: true,
        message: 'Username already exist'
      })
    } else {
      return res.json({
        Status: false,
        message: 'Username available for use'
      })
    }
  } catch (error) {
    console.log('An Error ' + error.message)
    res.status(500).json({
      message: 'Server error',
      error: error.message
    })
  }
})

// Get All Users posts
routes.get('/getallposts', async (req, res) => {
  try {
    const users = await UserData.find({}).sort({ createdAt: -1 })
    res.status(200).json({
      message: 'All users data',
      users
    })
  } catch (error) {
    console.log('An Error ' + error.message)
    res.status(500).json({
      message: 'Server error',
      error: error.message
    })
  }
})

module.exports = routes
