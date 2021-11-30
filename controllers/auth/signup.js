const User = require('../../model/users.model')
const sgMail = require('../../helper/sgMail')
const authJoi = require('../../midlewares/auth-validation/auth-valid')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { v4: uuidv4 } = require('uuid')

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
    const src = gravatar.url(email, { s: '250' })
    const verifyToken = uuidv4()
    await User.create({ email, password: newPassword, avatarURL: src, verifyToken })

    const msg = {
      to: email,
      subject: 'Verifycation email',
      html: `<a href="http://localhost:3000/api/auth/verify/${verifyToken}">Click to verify</a>`
    }
    sgMail(msg)

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
