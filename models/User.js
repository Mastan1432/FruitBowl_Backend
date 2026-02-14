const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // Basic Info
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // Subscription Info
    subscriptionPlan: {
      type: String,
      enum: ["Basic", "Standard", "Premium", "Diabetic"],
      default: "Basic",
    },

    duration: {
      type: String,
      enum: ["7 Days", "15 Days", "1 Month"],
      default: "7 Days",
    },

    startDate: {
      type: Date,
      default: Date.now,
    },

    endDate: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Fruit Box Customization
    fruitBox: {
      fruits: {
        type: [String],
        default: [],
      },

      note: {
        type: String,
        default: "",
      },
    },

    role: {
        type: String,
        enum: ["CUSTOMER", "ADMIN"],
        default: "CUSTOMER",
    },

    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending",
    },

  },
  { timestamps: true }
);

userSchema.pre("save", async function () {

  // ✅ HASH PASSWORD
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // ✅ AUTO CALCULATE END DATE
  if (!this.endDate && this.startDate && this.duration) {
    let days = 7;

    if (this.duration === "15 Days") days = 15;
    if (this.duration === "1 Month") days = 30;

    const end = new Date(this.startDate);
    end.setDate(end.getDate() + days);

    this.endDate = end;
  }

});


module.exports = mongoose.model("User", userSchema);