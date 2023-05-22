const express = require('express')
const { authorizeBearerToken } = require('../middleware/authMiddleware')

const roleController = require('../controllers/role');
const router = express.Router()

router.post('/getallroles', roleController.getAllRoles)
router.post('/getallrolenames', roleController.getAllRolenames)
router.post('/getrole', roleController.getRole)
router.post('/deleterole', roleController.deleteRole)
router.post('/updaterole', roleController.updateRole)
router.post('/createrole', roleController.createRole)

module.exports = router