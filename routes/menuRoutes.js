const express = require("express");
const Bowl = require("../models/Bowl");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();


// ✅ Add Bowl (Admin Only)
router.post("/add", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, price, items } = req.body;

    const bowl = await Bowl.create({
      name,
      price,
      items,
    });

    res.json({ message: "Bowl Added ✅", bowl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ Toggle Bowl Active/Inactive
router.put("/toggle/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const bowl = await Bowl.findById(req.params.id);

    bowl.isActive = !bowl.isActive;
    await bowl.save();

    res.json({ message: "Bowl Status Updated ✅", bowl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ Get All Bowls (Customer Side)
router.get("/", async (req, res) => {
  const bowls = await Bowl.find({ isActive: true });
  res.json(bowls);
});

module.exports = router;
