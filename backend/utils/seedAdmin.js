const bcrypt = require("bcryptjs");
const User = require("../models/User");

const seedAdminUser = async () => {
  const existingAdmin = await User.findOne({ username: "admin" });
  if (existingAdmin) return;

  const hashedPassword = await bcrypt.hash("admin", 10);
  const adminUser = new User({
    username: "admin",
    password: hashedPassword,
    email: "admin@xexit.com",
    role: "admin",
    country: "IN",
  });

  await adminUser.save();
  console.log(" Admin user seeded to MongoDB");
};

module.exports = seedAdminUser;
