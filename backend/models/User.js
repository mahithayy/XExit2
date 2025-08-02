const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Added for notifications
  role: { type: String, enum: ["employee", "admin"], default: "employee" },
  country: { type: String, default: "IN" }, // For Calendarific API
});

module.exports = mongoose.model("User", userSchema);