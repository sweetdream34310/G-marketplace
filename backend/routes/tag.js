const express = require('express')
const { authorizeBearerToken } = require('../middleware/authMiddleware')

const tagController = require('../controllers/tag');
const router = express.Router()

router.post('/createtag', tagController.createtag)
router.post('/getall', tagController.getAll)
router.post('/updatetag', tagController.updatetag)
router.post('/delete', tagController.deletetag)

module.exports = router