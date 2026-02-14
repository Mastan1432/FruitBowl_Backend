const User = require("../models/User");

const createDefaultAdmins = async () => {
  const admins = [
    {
      name: "Admin One",
      phone: "7995293957",
      password: "admin1",
      role: "ADMIN",
    },
    {
      name: "Admin Two",
      phone: "9603067559",
      password: "admin2",
      role: "ADMIN",
    },
  ];

  for (let admin of admins) {
    const exists = await User.findOne({ phone: admin.phone });

    if (!exists) {
      const newAdmin = new User(admin);
      await newAdmin.save();
      console.log("✅ Admin Created:", admin.phone);
    }
  }
};

module.exports = createDefaultAdmins;
