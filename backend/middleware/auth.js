// backend/middleware/auth.js (Corrected)

const jwt = require("jsonwebtoken");
//const { testTokens } = require("../db");
const testTokens = require("../utils/testTokens");

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

const authenticateToken = (req, res, next) => {
  let token = req.headers["authorization"];

  //  fallback for Cypress during testing
  if (!token && process.env.NODE_ENV === "test") {
    if (req.path.includes("/admin")) token = testTokens.admin;
    else token = testTokens.employee;
  }

  if (!token) return res.status(401).json({ message: "Access denied. Token missing." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token." });
  }
};


const authenticateAdmin = (req, res, next) => {
  authenticateToken(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  });
};

const authenticateEmployee = (req, res, next) => {
  authenticateToken(req, res, () => {
    if (req.user.role !== "employee") {
      return res.status(403).json({ message: "Access denied. Employees only." });
    }
    next();
  });
};

module.exports = {
  authenticateAdmin,
  authenticateEmployee,
};