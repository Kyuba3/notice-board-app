const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/ads.controller');
const imageUpload = require('../utils/imageUpload');

router.get('/ads', AdsController.getAllAds);
router.get('/ads/:id', AdsController.getAddById);
router.post('/ads', imageUpload.single('image'), AdsController.postAd);
router.delete('/ads/:id', AdsController.deleteAd);
router.put('/ads/:id', imageUpload.single('image'), AdsController.updateAd);
router.get('/ads/search/:searchPhrase', AdsController.search);

module.exports = router;