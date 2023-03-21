const Ads = require('../models/ads.model');

exports.getAllAds = async (req, res) => {
  try {
    res.json(await Ads.find());
  } catch (err) {
    res.status(500).json({ message: err.message });
  };
};

exports.getAddById = async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id).populate('User');
    if(!ad) res.status(404).json({ message: 'Not found...' });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  };
};

exports.postAd = async (req, res) => {
  try {
    const { title, description, date, image, price, localization, user} = req.body;
    const newAd = new Ads({ title, description, date, image, price, localization, user });
    await newAd.save();
    res.json({ message: 'OK' }); 
  } catch (err) {
    res.status(500).json({ message: err });
  };
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
  const { title, description, date, image, price, localization, user } = req.body;
  try {
      const ad = await Ads.findById(req.params.id);
      if (!ad) {
          return res.status(404).json({ message: 'Ad not found...' });
      } else {
          ad.title = title;
          ad.description = description;
          ad.price = price;
          ad.date = date;
          ad.localization = localization;
          ad.user = user;
          ad.image = image;
          await ad.save();
          res.json({ message: 'OK' });
      }
  } catch (err) {
      res.status(500).json({ message: err });
  };
};