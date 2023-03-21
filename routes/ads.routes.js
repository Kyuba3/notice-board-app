const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/ads.controller');

router.get('/ads', AdsController.getAllAds);
router.get('/ads/:id', AdsController.getAddById);
router.post('/ads', AdsController.postAd);
router.delete('/ads/:id', AdsController.deleteAd);
router.put('/ads/:id', AdsController.updateAd);

module.exports = router;