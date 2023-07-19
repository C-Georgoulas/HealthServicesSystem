const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Note Schema for patients

// Add the author when passport.js is added and configured

const PrescriptionSchema = new Schema({
  drug: {
    type: String,
  },
  class: {
    type: String,
  },
  dose: {
    type: String,
  },
  doseCriteria: {
    type: String,
  },
  diagnosis: {
    type: String,
  },
  name: {
    type: String,
  },
  prescriptionDate: {
    type: Date,
    default: Date.now,
  },
  prescriptionExpirationDate: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Prescription", PrescriptionSchema);
