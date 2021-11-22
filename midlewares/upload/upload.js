const multer = require('multer')
const path = require('path')

const tempPath = path.join(__dirname, '../../', 'temp')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempPath)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
  limits: {
    fileSize: 2048
  }
})

const upload = multer({ storage: storage })

module.exports = upload
