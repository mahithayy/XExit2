const Resignation = require("../models/Resignation");
const ExitResponse = require("../models/Response");
const User = require("../models/User");
const isWorkingDay = require("../utils/calendarific");

exports.submitResignation = async (req, res) => {
  try {
    const { lwd, reason } = req.body;
    const employeeId = req.user.userId;

    const user = await User.findById(employeeId);
    if ((await isWorkingDay(lwd, user.country))) {
      return res.status(400).json({ message: "Last working day must be a valid working day (not a weekend or holiday)." });
    }

    const existing = await Resignation.findOne({
      employeeId,
      status: { $in: ["pending", "approved"] }
    });

    if (existing) {
      return res.status(400).json({ message: "You already have an active resignation request." });
    }

    const resignation = new Resignation({
      employeeId,
      lwd,
      reason,
      status: "pending",
      submissionDate: new Date()
    });

    await resignation.save();

    res.status(200).json({
      message: "Resignation submitted successfully.",
      data: { resignation: { _id: resignation._id } },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.submitExitResponses = async (req, res) => {
  try {
    const { responses } = req.body;
    const employeeId = req.user.userId;

    const approved = await Resignation.findOne({
      employeeId,
      status: "approved"
    });

    if (!approved) {
      return res.status(403).json({ message: "You cannot submit an exit interview without an approved resignation." });
    }

    const response = new ExitResponse({
      employeeId,
      responses
    });

    await response.save();

    res.status(200).json({ message: "Exit questionnaire submitted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
