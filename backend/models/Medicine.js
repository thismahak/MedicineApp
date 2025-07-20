const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  expiryDate: Date,
  room: String,
  addedBy: String,
  notes: String,
  image: String, // Optional image URL
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);
