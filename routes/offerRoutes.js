const express = require("express");
const Offer = require("../models/Offer");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();


// ✅ Add Offer (Admin Only)
router.post("/add", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const offer = await Offer.create(req.body);

    res.json({ message: "Offer Added 🎉", offer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ List Offers (Frontend Home Page)
router.get("/", async (req, res) => {
  const offers = await Offer.find({ isActive: true });
  res.json(offers);
});

module.exports = router;
