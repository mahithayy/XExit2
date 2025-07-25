const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  resignationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resignation",
    required: true
  },
  hrId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  mode: {
    type: String,
    enum: ["in-person", "online"],
    required: true
  },
  status: {
    type: String,
    enum: ["scheduled", "completed"],
    default: "scheduled"
  }
}, { timestamps: true });

module.exports = mongoose.model("Interview", interviewSchema);
