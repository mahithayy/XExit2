const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["HR", "Employee"],
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const QuestionnaireSchema = new mongoose.Schema({
  questions: [questionSchema],
}, {
  timestamps: true,
});

module.exports = mongoose.model("Questionnaire", QuestionnaireSchema);
