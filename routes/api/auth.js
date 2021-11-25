const express = require('express')
const router = express.Router()
const signup = require('../../controllers/auth/signup')
const login = require('../../controllers/auth/login')
const logout = require('../../controllers/auth/logout')
const current = require('../../controllers/auth/currentUser')
const uploadAvatar = require('../../controllers/auth/uploadAvatar')
const checkVerify = require('../../controllers/auth/verify')
const reVerification = require('../../controllers/auth/reVerification')
const authenticate = require('../../midlewares/auth-validation/authenticate')
const upload = require('../../midlewares/upload/upload')

router.get('/logout', authenticate, logout)

router.get('/current', authenticate, current)

router.get('/verify/:verificationToken', checkVerify)

router.post('/signup', signup)

router.post('/login', login)

router.post('/verify', reVerification)

router.patch('/avatars', authenticate, upload.single('avatar'), uploadAvatar)

module.exports = router
