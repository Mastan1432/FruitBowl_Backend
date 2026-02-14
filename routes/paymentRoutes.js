const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();


router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select(
      "name subscriptionPlan paymentStatus"
    );

    const payments = users.map((u) => ({
      _id: u._id,
      customerName: u.name,
      plan: u.subscriptionPlan,
      status: u.paymentStatus || "Pending",
      amount: 0,
      balance: 0,
    }));

    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ✅ Update Payment Status (Admin Only)
router.put("/update/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: status },
      { new: true }
    );

    res.json({ message: "Payment Status Updated 💳", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
