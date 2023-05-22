const express = require('express');
const notificationController = require('../controllers/notification');

const router = express.Router();

router.post('/getnotification', notificationController.getNotification)
router.post('/putnotification', notificationController.putNotification)
router.post('/deletenotification', notificationController.deleteNotification)
router.post('/deletenotificationarray', notificationController.deleteNotificationArray)

module.exports = router