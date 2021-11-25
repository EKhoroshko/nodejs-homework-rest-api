const User = require('../../model/users.model')
const authJoi = require('../../midlewares/auth-validation/auth-valid')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { SECRET } = process.env

const login = async (req, res, next) => {
  try {
    const { error } = authJoi.validate(req.body)
    const { email, password } = req.body
    if (error) {
      return res.status(400).json({
        message: 'Incorrect login or password'
      })
    }
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Not Found' })
    }
    const comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return res.status(401).json({ message: 'Email or password is wrong' })
    }
    if (!user.verify) {
      return res.status(401).json({
        message: 'account is not verificate'
      })
    }

    const payload = {
      id: user._id
    }

    const token = jwt.sign(payload, SECRET, { expiresIn: '2h' })
    await User.findByIdAndUpdate(user._id, { token })
    res.status(200).json({
      token,
      user: {
        email,
        subscription: 'starter',
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login
