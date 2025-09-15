const express = require('express');
const Movie = require('../models/Movie');
const auth = require('../middleware/auth');
const multer = require('multer');
const fs = require('fs');

// Save uploads to ./uploads
if(!fs.existsSync('uploads')) fs.mkdirSync('uploads');

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'uploads/') },
  filename: function (req, file, cb) { cb(null, Date.now() + '-' + file.originalname) }
});
const upload = multer({ storage });
const router = express.Router();

// public: list
router.get('/', async (req,res)=>{
  const movies = await Movie.find().sort({ createdAt: -1 });
  res.send(movies);
});

// admin: add movie
router.post('/', auth('admin'), upload.single('poster'), async (req,res)=>{
  try{
    const { title, description, videoUrl, tags, isPremium } = req.body;
    const posterUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : '';
    const movie = await Movie.create({ title, description, posterUrl, videoUrl, tags: tags? tags.split(',') : [], isPremium: isPremium==='true' });
    res.send(movie);
  }catch(err){ res.status(500).send({ message: 'Server error', error: err.message }) }
});

module.exports = router;
