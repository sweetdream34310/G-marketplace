const express = require('express')
const { authorizeBearerToken } = require('../middleware/authMiddleware')

const userController = require('../controllers/user')

const router = express.Router()

router.post('/getallusers', userController.getAllUsers)
router.post('/getuser', userController.getUser)
router.post('/updateusernamerole', userController.updateUsernameRole)
router.post('/deleteuser', userController.deleteUser)
router.post('/createuser', userController.createUser)
router.post('/login', userController.login)
router.post('/changeaccount', userController.changeAccount)
router.post('/forgotpassword', userController.forgotPassword)
router.post('/getpermissions', userController.getPermissions)
router.post('/getrole', userController.getRole)

module.exports = router