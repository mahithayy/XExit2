const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Authenticate any valid user
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // If admin
    if (decoded.username === "admin") {
      req.user = { role: "admin", username: "admin" };
    } else {
      // Regular employee
      const user = await User.findById(decoded.id);
      if (!user) return res.status(401).json({ message: "User not found" });
      req.user = user;
    }

    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

// Only for employees
const authenticateEmployee = async (req, res, next) => {
  await authenticateToken(req, res, () => {
    if (req.user.role === "admin") {
      return res.status(403).json({ message: "Admins are not allowed here" });
    }
    next();
  });
};

// Only for admin
const authenticateAdmin = async (req, res, next) => {
  await authenticateToken(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can access" });
    }
    next();
  });
};

module.exports = {
  authenticateToken,
  authenticateEmployee,
  authenticateAdmin,
};
