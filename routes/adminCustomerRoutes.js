const express = require("express");
const router = express.Router();
const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Add Customer
router.post("/add-customer", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, phone, subscriptionPlan, duration, startDate } = req.body;

    const userExists = await User.findOne({ phone });
    if (userExists)
      return res.status(400).json({ message: "Customer already exists ❌" });

    // ✅ Default Password
    const defaultPassword = phone;

    const newUser = new User({
      name,
      phone,
      password: defaultPassword,   // ✅ Important
      subscriptionPlan,
      duration,
      startDate,
      role: "CUSTOMER",            // ✅ Force customer role
    });

    await newUser.save();

    res.json({
      message: "Customer added successfully ✅",
      user: newUser,
      newUser
    });

  } catch (err) {
    res.status(500).json({ message: "Error adding customer ❌" });
  }
});


// Get All Customers
router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
   try {
      const customers = await User.find({ role: "CUSTOMER" }).select(
        "-password"
      );

      res.json(customers);
    } catch (err) {
      res.status(500).json({ message: "Error fetching customers ❌" });
    }
});


module.exports = router;
