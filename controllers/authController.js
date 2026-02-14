const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone });

    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
  { id: user._id, role: user.role }, // ✅ add role
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

    res.json({
      message: "Login Successful ✅",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { loginUser};
