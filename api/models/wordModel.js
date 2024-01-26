const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
