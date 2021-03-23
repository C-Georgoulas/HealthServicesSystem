const mongoose = require("mongoose");
const Schema = mongoose.Schema

// Grade Schema for trainees

// Add the author when passport.js is added and configured

const GradeSchema = new Schema({
    title: {
        type: String
    },
    text: {
        type: String
    },
    mark: {
        type: Number
    },
    addedOnDate: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
}
});

    // author: {
    //     id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User"
    //     },
    //     username: String
    // }

module.exports = mongoose.model('Grade', GradeSchema);