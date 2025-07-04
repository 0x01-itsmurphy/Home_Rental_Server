const jwt = require('jsonwebtoken')
const config = require('./config')

const cToken = async (req, res, next) => {
  try {
    const token = req.headers['auth-token'] || req.headers.authorization
    console.log('Token received:', token)

    if (!token) {
      return res.status(401).json({
        status: false,
        message: 'Auth token is not supplied'
      })
    }

    // Handle Bearer token format
    const tokenValue = token.startsWith('Bearer ') ? token.slice(7) : token

    const decoded = jwt.verify(tokenValue, config.key)
    req.user = decoded
    console.log('User decoded:', decoded)
    next()
  } catch (err) {
    console.error('Token verification error:', err)
    return res.status(401).json({
      status: false,
      message: 'Invalid token',
      error: err.message
    })
  }
}

module.exports = { cToken }
