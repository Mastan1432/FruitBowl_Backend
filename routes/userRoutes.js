const express = require("express");
const { getProfile, saveFruitBox } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, getProfile);

router.post("/fruitbox", authMiddleware, saveFruitBox);

module.exports = router;
