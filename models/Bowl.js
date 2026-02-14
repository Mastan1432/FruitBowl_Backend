const mongoose = require("mongoose");

const bowlSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    price: { type: Number, required: true },

    items: { type: Array, default: [] }, // fruits + sprouts etc

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bowl", bowlSchema);
