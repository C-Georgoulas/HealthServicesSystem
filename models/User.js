const mongoose = require("mongoose");

// Define Schemas
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notification",
    },
  ],
});

userSchema.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await Notification.deleteMany({
      _id: {
        $in: doc.notes,
      },
    });
  }
});

// Register Models on Schema
mongoose.model("User", new mongoose.Schema(userSchema, { timestamps: true }));

module.exports = User = mongoose.model("user", userSchema);
