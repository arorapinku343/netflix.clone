const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const paymentRoutes = require('./routes/payments');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGODB_URI)
  .then(()=> app.listen(PORT, ()=> console.log('Server running on', PORT)))
  .catch(err=> console.error('Mongo connect error', err));
