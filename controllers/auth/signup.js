const User = require('../../model/users.model')
const authJoi = require('../../midlewares/auth-validation/auth-valid')
const bcrypt = require('bcryptjs')

const signup = async (req, res, next) => {
  try {
    const { error } = authJoi.validate(req.body)
    const { email, password } = req.body
    if (error) {
      return res.status(400).json({
        message: 'Error validation'
      })
    }
    const user = await User.findOne({ email })
    if (user) {
      return res.status(409).json({ message: 'Email in use' })
    }
    const newPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    await User.create({ email, password: newPassword })
    res.status(201).json({
      newUser: {
        email,
        password: newPassword,
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = signup
