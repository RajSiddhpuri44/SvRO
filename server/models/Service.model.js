
const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  serviceDate: { type: Date, required: true },
  serviceDescription: { type: String, required: true },
  amountCharged: { type: Number, required: true },
  profitEarned: { type: Number, required: true },
  referral: {
    name: { type: String },
    commissionPercentage: { type: Number },
    note: { type: String } 
  },
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);