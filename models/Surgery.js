const mongoose = require("mongoose");
const Schema = mongoose.Schema
const User = require('./User')

// Note Schema for patients 

// Add the author when passport.js is added and configured

const SurgerySchema = new Schema({
    title: {
        type: String
    },
    text: {
        type: String
    },
    startDate: {
        type: Date,
    },
    author: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

module.exports = mongoose.model('Surgery', SurgerySchema);