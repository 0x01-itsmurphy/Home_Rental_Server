const express = require('express')

const routes = express.Router()

routes.get('/', (req, res) => {
  res.status(200).json({
    message: 'Home Rental Server API',
    version: '1.0.0',
    endpoints: {
      auth: {
        signin: 'POST /profile/signin',
        signup: 'POST /profile/signup'
      },
      posts: {
        create: 'POST /posts/add',
        getAll: 'GET /posts/',
        getById: 'GET /posts/:id'
      },
      api: {
        getAllPosts: 'GET /api/getallposts',
        deleteUser: 'DELETE /api/delete/:username',
        checkUsername: 'GET /api/checkusername/:username'
      }
    }
  })
})

routes.all('/bla/bla', async (req, res) => {
  res.status(200).json({
    message: 'Test Route Working',
    method: req.method,
    timestamp: new Date().toISOString()
  })
})

// Health check endpoint
routes.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

module.exports = routes
