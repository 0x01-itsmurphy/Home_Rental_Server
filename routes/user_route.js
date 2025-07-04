const express = require('express')
const User = require('../models/user_model')
const config = require('../config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt') // to encrypt the password to hash

const checkToken = require('../checkToken')
const routes = express.Router()

routes.get('/', (req, res) => {
  res.send('This is the First API Route')
})

// user profile details
routes.get('/profile/auth/:username', checkToken.cToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
    if (user) {
      res.status(200).json({
        message: 'User found',
        user
      })
    } else {
      res.status(404).json({
        message: 'User not found'
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error in finding the user',
      error: error.message
    })
  }
})

// SignIn Route
routes.post('/profile/signin', async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        message: 'Email is Required'
      })
    }

    // check if user already exist
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).json({
        message: 'User does not exist, please register.'
      })
    }

    // validating password which is created
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    )

    if (!validPassword) {
      return res.status(400).json({
        message: 'Invalid Password'
      })
    }

    const token = jwt.sign({ _id: user._id }, config.key, {
      expiresIn: '24h'
    })
    res.header('auth-token', token).json({
      message: 'User logged in successfully',
      token,
      user
    })
  } catch (error) {
    console.log('An Error ' + error.message)
    res.status(500).json({
      message: 'Server error',
      error: error.message
    })
  }
})

// SignUp Route
routes.post('/profile/signup', async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({
        message: 'Password is Required'
      })
    }

    if (!req.body.email) {
      return res.status(400).json({
        message: 'Email is Required'
      })
    }

    const emailExist = await User.findOne({ email: req.body.email })
    const usernameExist = await User.findOne({ username: req.body.username })

    if (emailExist || usernameExist) {
      return res.status(400).json({
        message: 'Email or Username already exist'
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword
    })

    // Save or send data to the MongoDB collection
    await user.save()

    // Return Json
    res.status(201).json({
      message: 'Successfully Registered',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    console.log('An Error ' + error.message)
    res.status(500).json({
      message: 'Server error',
      error: error.message
    })
  }
})

routes.get('/api/users', checkToken.cToken, async (req, res) => {
  res.send('Get All the Files')
})

routes.get('/api/files/:filename', (req, res) => {
  res.send('Get Specific File')
})

// we have to export the routes
module.exports = routes
