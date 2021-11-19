const express = require('express')
const router = express.Router()
const signup = require('../../controllers/auth/signup')
const login = require('../../controllers/auth/login')
const logout = require('../../controllers/auth/logout')
const current = require('../../controllers/auth/currentUser')
const authenticate = require('../../midlewares/auth-validation/authenticate')

router.post('/signup', signup)

router.post('/login', login)

router.get('/logout', authenticate, logout)

router.get('/current', authenticate, current)

module.exports = router
