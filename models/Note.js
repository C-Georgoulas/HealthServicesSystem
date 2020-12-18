const mongoose = require("mongoose");
const Schema = mongoose.Schema

// Note Schema for patients 

// Add the author when passport.js is added and configured

const NoteSchema = new Schema({
    title: {
        type: String
    },
    text: {
        type: String
    },
    username: {
        type: String
    },
    addedOnDate: {
        type: Date,
        default: Date.now
    }
});

    // author: {
    //     id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     },
    //     username: String
    // }

module.exports = mongoose.model('Note', NoteSchema);