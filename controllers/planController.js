const Plan = require("../models/Plan");

// ➕ Create Plan
const createPlan = async (req, res) => {
  try {
    const { name, maxFruits, availableFruits } = req.body;

    const plan = await Plan.create({
      name,
      maxFruits,
      availableFruits,
    });

    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📥 Get All Plans
const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏ Update Plan
const updatePlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maxFruits, availableFruits } = req.body;

    const updated = await Plan.findByIdAndUpdate(
      id,
      { name, maxFruits, availableFruits },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPlan, getPlans, updatePlan };