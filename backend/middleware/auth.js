// backend/middleware/auth.js (Corrected)

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

const authenticateToken = (req, res, next) => {
  //const token = req.headers["authorization"];
   const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
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
