const express = require("express");
const router = express.Router();
const {
  createPlan,
  getPlans,
  updatePlan,
} = require("../controllers/planController");

router.post("/", createPlan);
router.get("/", getPlans);
router.put("/:id", updatePlan);

module.exports = router;