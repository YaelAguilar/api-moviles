require('dotenv').config(); 
const express = require('express');
const app = express();

const authRoutes = require('./routes/authRoutes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.use(authRoutes);

module.exports = app;
