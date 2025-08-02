const Resignation = require("../models/Resignation");
const ExitResponse = require("../models/Response");
const User = require("../models/User");
const sendEmail = require("../utils/mailer");

exports.getAllResignations = async (req, res) => {
  try {
    const resignations = await Resignation.find().populate("employeeId", "username email");
    res.status(200).json({ data: resignations });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.concludeResignation = async (req, res) => {
  try {
    const { resignationId, approved, lwd } = req.body;
    const status = approved ? "approved" : "rejected";

    const resignation = await Resignation.findById(resignationId);
    if (!resignation) {
      return res.status(404).json({ message: "Resignation not found" });
    }

    resignation.status = status;
    resignation.lwd = lwd;
    await resignation.save();

    const employee = await User.findById(resignation.employeeId);
    if (employee && employee.email) {
      const subject = `Update on your Resignation Request`;
      const text = `Dear ${employee.username},\n\nYour resignation request has been ${status}. Your last working day is set to ${new Date(lwd).toLocaleDateString()}.\n\nThank you,\nXExit HR`;
      await sendEmail(employee.email, subject, text);
    }

    res.status(200).json({ message: `Resignation has been ${status}.` });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAllExitResponses = async (req, res) => {
  try {
    const responses = await ExitResponse.find().populate("employeeId", "username");
    res.status(200).json({ data: responses });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
