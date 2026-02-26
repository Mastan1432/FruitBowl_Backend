const User = require("../models/User");

const saveFruitBox = async (req, res) => {
  const { fruits, note } = req.body;

  try {
    const user = await User.findById(req.user.id);

    user.fruitBox = { fruits, note };
    await user.save();

    res.json({ message: "Fruit Box Saved ✅", fruitBox: user.fruitBox });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
   try {
    const user = await User.findById(req.user.id)
  .select("-password")
  .populate("subscriptionPlan");

    // Calculate Days Left
    const today = new Date();
    const diffTime = user.endDate - today;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    res.json({
      ...user._doc,
      daysLeft: daysLeft > 0 ? daysLeft : 0,
      status: daysLeft > 0 ? "Active" : "Expired",
    });
  } catch (error) {
    res.status(500).json({ message: "Profile fetch error" });
  }
};


module.exports = { saveFruitBox ,getProfile};
