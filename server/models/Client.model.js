const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String },
  googleMapsLink: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);