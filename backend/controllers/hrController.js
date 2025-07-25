const Resignation = require("../models/Resignation");
const Interview = require("../models/Interview");
const nodemailer = require("../utils/mailer");

exports.getPendingResignations = async (req, res) => {
  try {
    const resignations = await Resignation.find({ status: "pending" }).populate("employeeId", "username");
    res.status(200).json({ data: { resignations } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.processResignation = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await Resignation.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: "Resignation not found" });

    await nodemailer.notifyEmployee(updated.employeeId, status);
    res.status(200).json({ message: `Resignation ${status}` });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.scheduleInterview = async (req, res) => {
  try {
    const { resignationId, date } = req.body;

    const interview = new Interview({ resignationId, date });
    await interview.save();

    res.status(200).json({ message: "Interview scheduled" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
