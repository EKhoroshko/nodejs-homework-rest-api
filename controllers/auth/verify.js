const User = require('./../../model/users.model')

const checkVerify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params
    const user = await User.findOne({ verifyToken: verificationToken })
    if (!user) {
      return res.status(404).json({
        message: 'Not Found'
      })
    }
    await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true })
    return res.status(200).json({
      message: 'Verification successful'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = checkVerify
