const express = require('express');
const emailController =  require('../controllers/email');
const router = express.Router();

router.post('/send', emailController.sendEmail);
router.post('/outstandingactivityemail', emailController.outstandingAcitivity)
module.exports = router
