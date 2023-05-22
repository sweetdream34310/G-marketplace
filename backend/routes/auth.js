const express = require('express')
const { authorizeBearerToken } = require('../middleware/authMiddleware')

const authController = require('../controllers/auth')

const router = express.Router()

router.post('/register', authController.register)

router.post('/login', authController.login)

router.post('/changeAccount', authController.changeAccount)

router.post('/changePassword', authController.changePassword)

module.exports = router
