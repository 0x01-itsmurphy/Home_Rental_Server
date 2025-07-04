const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')

const userRoute = require('./routes/user_route')
const dataRoute = require('./routes/data_route')
const crudRoute = require('./routes/crud_route')

const newRoute = require('./routes/new')

const dotenv = require('dotenv')

const fileUpload = require('express-fileupload')

dotenv.config()
const app = express()
const port = process.env.PORT || 3000
const MONGO_URL = process.env.MONGODB_URL

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use(limiter)

// MiddleWare
const middleware = async () => {
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json({ extended: false }))

  app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
  }))

  app.use('/', userRoute)
  app.use('/posts', dataRoute)
  app.use('/uploads', express.static('uploads'))
  app.use('/api', crudRoute)
  app.use('/', newRoute)
  app.use('/bla/bla', newRoute)
}

// Function to connect MongoDB
const connectMongoose = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB Connected')
  } catch (error) {
    console.log('Error while Connecting to MongoDB:', error)
  }
}

const listenToPort = async () => {
  app.listen(port, () => {
    console.log('Server Running on port ' + port)
  })
}

// Trigger Functions
const startServer = async () => {
  try {
    await connectMongoose()
    await middleware()
    await listenToPort()
  } catch (error) {
    console.error('Error starting server:', error)
  }
}

startServer()
