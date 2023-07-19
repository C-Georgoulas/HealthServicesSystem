const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

// Note Schema for patients

// Add the author when passport.js is added and configured

const NotificationSchema = new Schema({
  title: {
    type: String,
  },
  details: {
    type: String,
  },
  addedOnDate: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
  },
  isNoteNotification: {
    type: Boolean,
  },
  isPrescriptionNotification: {
    type: Boolean,
  },
  isSurgeryNotification: {
    type: Boolean,
  },
  isTraineeNotification: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Notification", NotificationSchema);
