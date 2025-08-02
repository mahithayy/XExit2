const mongoose = require("mongoose");

const resignationSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lwd: { // Last Working Day
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resignation", resignationSchema);