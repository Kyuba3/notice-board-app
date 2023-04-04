const mongoose = require('mongoose');

const connectToDB = () => {
  // connect to DB
  const NODE_ENV  = process.env.NODE_ENV;
  let dbURI = '';
  if (NODE_ENV === 'production') {
    dbURI = `mongodb+srv://Kyuba3:${process.env.DB_PASS}@cluster0.lsrtv0c.mongodb.net/adsDb?retryWrites=true&w=majority`;
  } else if (NODE_ENV === 'test') {
    dbURI = 'mongodb://localhost:27017/adsDbTest';
  } else {
    dbURI = 'mongodb://localhost:27017/adsDb';
  }

  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;

  // on success
  db.once('open', () => {
    console.log('Connected to the database');
  });

  // on error
  db.on('error', (err) => console.log(`Error: ${err}`));
};

module.exports = connectToDB;
