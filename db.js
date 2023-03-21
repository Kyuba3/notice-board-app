const mongoose = require('mongoose');

const connectToDB = () => {

  const NODE_ENV = process.env.NODE_ENV;

  if( NODE_ENV === 'production' ) 
  dbatlas = `mongodb+srv://Kyuba3:7xSqImSaMkKcojKH@cluster1.ntzrjab.mongodb.net/?retryWrites=true&w=majority`;
  else if( NODE_ENV === 'test' ) dbatlas = 'mongodb://localhost:27017/adsDbTest';
  else dbatlas = 'mongodb://localhost:27017/adsDb';

  mongoose.connect(dbatlas, {useNewUrlParser: true});

  const db = mongoose.connection;

  db.once('open', () => {
    console.log('Connected to db');
  });

  db.on('error', (err) => {
    console.log('Error ' + err);
  });
};

module.exports = connectToDB;