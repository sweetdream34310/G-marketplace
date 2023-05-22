const express = require('express');
const spapiController =  require('../controllers/spapi');
const router = express.Router();

router.get('/getprice', spapiController.getPrice);
router.get('/getasinitem', spapiController.getItemWithAsin);
router.get('/getmarketplaceparticipations', spapiController.allMarketplacePartipants);
router.post('/getitems', spapiController.getItems);
router.post('/putitemwithsku', spapiController.putItemWithSKU);
router.post('/putpricewithskuarray', spapiController.putPriceWithSkuArray);
router.post('/putitembusinesswithsku', spapiController.putItemBusinessWithSKU)

module.exports = router
