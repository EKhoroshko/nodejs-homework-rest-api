const User = require('../../model/users.model')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { SECRET } = process.env

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      res.status(401).json({
        message: 'Not authorized'
      })
    }
    try {
      const { id } = jwt.verify(token, SECRET)
      const user = await User.findById(id, ' _id email token subscription')
      if (!user) {
        return res.status(404).json({
          message: 'User not Found'
        })
      }
      if (!user.token) {
        return res.status(401).json({
          message: 'Not authorized'
        })
      }
      req.user = user
      next()
    } catch (error) {
      return res.status(401).json({
        message: 'Not authorized'
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
