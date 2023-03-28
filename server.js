const express = require('express');
const cors = require('cors');
const path = require('path');
const connectToDB = require('./db');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

connectToDB();

if(process.env.NODE_ENV !== 'production'){
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ 
  secret: 'xyz567', 
  store: MongoStore.create(mongoose.connection), 
  saveUninitialized: false , 
  resave: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  }, 
}));

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, '/public')));

app.use('/api', adsRoutes);
app.use('/auth', authRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

console.log(process.env.secret);