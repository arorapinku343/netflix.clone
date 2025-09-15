const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  posterUrl: String,
  videoUrl: String,
  tags: [String],
  isPremium: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);
