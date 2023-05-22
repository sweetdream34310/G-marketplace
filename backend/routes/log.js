const express = require('express')
const { authorizeBearerToken } = require('../middleware/authMiddleware')
const logController = require('../controllers/log');

const router = express.Router()

router.post('/getlogs', logController.getLogs)
router.post('/getlog', logController.getLog)

module.exports = router