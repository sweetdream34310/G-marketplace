const express = require('express')
const { authorizeBearerToken } = require('../middleware/authMiddleware')

const taskController = require('../controllers/task');
const router = express.Router()

router.post('/createtask', taskController.createTask)
router.post('/getall', taskController.getAll)
router.post('/updatetask', taskController.updateTask)
router.post('/delete', taskController.deleteTask)

module.exports = router