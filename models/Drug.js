const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DrugSchema = new Schema({
  name: {
    type: String,
  },
  class: {
    type: String,
  },
  description: {
    type: String,
  },
  administered: {
    type: String,
  },
  suggestedDoseAdult: {
    type: String,
  },
  suggestedDosePediatric: {
    type: String,
  },
});

module.exports = Drug = mongoose.model("drug", DrugSchema);
