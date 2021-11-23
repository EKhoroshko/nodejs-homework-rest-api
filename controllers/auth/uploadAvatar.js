const path = require('path')
const fs = require('fs/promises')
const User = require('../../model/users.model')
const Jimp = require('jimp')

const avatarPath = path.join(__dirname, '../../public/avatars')

const uploadAvatar = async (req, res, next) => {
  const { id } = req.user
  const { path: tempUpload, filename } = req.file
  await Jimp.read(tempUpload).then(image => {
    return image
      .resize(250, 250).write(tempUpload)
  })
  try {
    const resultUpload = path.join(avatarPath, filename)
    await fs.rename(tempUpload, resultUpload)
    const avatar = path.join('/avatars', filename)
    const user = await User.findByIdAndUpdate(id, { avatarURL: avatar }, { new: true })
    if (!user) {
      return res.status(404).json({ message: 'Not Found' })
    }
    return res.status(200).json({ avatarURL: user.avatarURL })
  } catch (error) {
    await fs.unlink(tempUpload)
    next(error)
  }
}

module.exports = uploadAvatar
