const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Admin Login
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  const admin = await User.findOne({ phone });

  if (!admin || admin.role !== "ADMIN") {
    return res.status(400).json({ message: "Not an admin ❌" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password ❌" });
  }

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    message: "Admin login success ✅",
    token,
    user:admin,
  });
});


router.put("/toggle/:id", authMiddleware, adminMiddleware, async (req, res) => {
  const user = await User.findById(req.params.id);

  user.isActive = !user.isActive;
  await user.save();

  res.json({ message: "Status Updated", user });
});


module.exports = router;
