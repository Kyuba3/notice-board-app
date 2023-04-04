const Ads = require('../models/ads.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.getAllAds = async (req, res) => {
  try {
    res.json(await Ads.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  };
};

exports.getAddById = async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id);
    if(!ad) res.status(404).json({ message: 'Not found...' });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  };
};

exports.postAd = async (req, res) => {
  try {
    const { title, description, date, price, localization, user } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

    if (title && description && price && localization && date && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
      const newAd = new Ads({
        title: title,
        description: description,
        date: date,
        price: price,
        localization: localization,
        image: req.file.filename,
        user: req.session.id
      });
      await newAd.save();
      res.json({ message: 'New Ads' });
    } else {
      if (req.file) {
        fs.unlinkSync(`./client/public/uploads/${req.file.filename}`);
      }
      res.status(400).send({ message: 'bad' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAd = async (req, res) => {
  try {
      const ad = await Ads.findById(req.params.id);
      if (ad) {
          await Ads.deleteOne({ _id: req.params.id });
          res.json(ad);
      } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
      res.status(500).json({ message: err });
  };
};
    
exports.updateAd = async (req, res) => {
  try {
    const { title, description, date, price, localization } = req.body;
    const image = req.file;
    const fileType = image ? await getImageFileType(image) : 'unknown';
    console.log(req.params.id);

    const ad = await Ads.findById(req.params.id);
    if (!ad) {
        return res.status(404).json({ message: 'Ad not found...' });
    } else {
        ad.title = title;
        ad.description = description;
        ad.price = price;
        ad.date = date;
        ad.localization = localization;
        await ad.save();
        res.json({ message: 'OK' });
    }
  } catch (err) {
      res.status(500).json({ message: err.message });
  };
};

exports.search = async (req, res) => {
  const { searchPhrase } = req.params;
  try{
    const ad = await Ads.find({ title: {$regex: searchPhrase }});
    if (!ad) res.status(404).json({message: 'Not found'});
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err.message})
  }
};