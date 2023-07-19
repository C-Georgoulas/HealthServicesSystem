const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Grade = require("./Grade");

// Create Schema for patients

const TraineeSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
  },
  age: {
    type: Number,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  department: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  grades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
    },
  ],
  averageGrade: {
    type: Number,
  },
  status: {
    type: String,
  },
  supervisor: {
    type: String,
  },
});

// This middleware deletes all grades associated with a specific Trainee
// the trainee in routes needs to be deleted by findByIdAndDelete otherwise it wont work

TraineeSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Grade.deleteMany({
      _id: {
        $in: doc.grades,
      },
    });
  }
});

module.exports = Trainee = mongoose.model("trainee", TraineeSchema);
