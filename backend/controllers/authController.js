// backend/controllers/authController.js

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
// const { db } = require("../db");
// const { testTokens } = require("../db");
const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";
const User = require("../models/User");
const testTokens = require("../utils/testTokens");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Invalid credentials" });

  const payload = {
    userId: user._id,
    role: user.role,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  if (process.env.NODE_ENV === "test") {
    if (user.role === "admin") testTokens.admin = token;
    if (user.role === "employee") testTokens.employee = token;
  }

  res.status(200).json({ token });
};

exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword,
    email: email || `${username}@autogen.com`,
    role: "employee",
    country: "IN",
  });

  await user.save();

  res.status(201).json({ message: "User registered successfully" });
};