const User = require('../../model/users.model')
const sgMail = require('../../helper/sgMail')

const reVerification = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({
        message: 'missing required field email'
      })
    }
    const user = await User.findOne({ email })
    if (!user.verify) {
      const msg = {
        to: email,
        subject: 'Verifycation email',
        html: `<a href="http://localhost:3000/api/auth/verify/${user.verifyToken}">Click to verify</a>`
      }
      sgMail(msg)

      return res.status(200).json({
        message: 'Verification email sent'
      })
    }
    res.status(400).json({
      message: 'Verification has already been passed'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = reVerification
