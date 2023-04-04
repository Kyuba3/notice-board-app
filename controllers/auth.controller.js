const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');

exports.register = async (req, res) => {
  try {
    
    const { login, password } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknow';

    
    if (login && typeof login === 'string' && password && typeof password === 'string' && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin){
        return (
          fs.unlinkSync(`./public/uploads/${req.file.filename}`),
          res.status(409).send({ message: 'User with this login already exists' })
        );
      }

      const user = await User.create({ login, password: await bcrypt.hash(password, 10), avatar: req.file.filename});
      res.status(201).send({ message: 'User created ' + user.login });
    } else {
        if (req.file) {
          fs.unlinkSync(`./public/uploads/${req.file.filename}`);
        }
        res.status(400).send({ message: 'Bad request' });
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (login && typeof login === 'string' && password && typeof password === 'string'){
      const user = await User.findOne({ login });
      if(!user){
        res.status(400).send({ message :'Login or password are incorrect' });
      } 
      else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.login = user.login;
          res.status(200).send({ message: 'Login successfull'});
        } 
        else {
          res.status(400).send({ message: 'Login or password are incorrect' });
        }
      }
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  };
};

exports.getUser = async (req, res) => {
  try {
    res.json(req.session.login);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    req.session.destroy();
    res.send('You have been logout successfully!');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserByLogin = async (req, res) => {
  try {
    const user = await User.findOne({ login: req.params.login });
    if(!user) return res.status(404).json({ message: 'User not found' });
    else res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};