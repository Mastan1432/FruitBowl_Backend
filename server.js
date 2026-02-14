const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const menuRoutes = require("./routes/menuRoutes");
const offerRoutes = require("./routes/offerRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/user", require("./routes/userRoutes"));

app.use("/api/admin", require("./routes/adminRoutes"));

app.use("/api/admin/customers", require("./routes/adminCustomerRoutes"));

app.use("/api/menu", menuRoutes);

app.use("/api/offers", offerRoutes);

app.use("/api/payments", paymentRoutes);


app.use(
  cors({
    origin: "*", // later you can restrict
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("FruitBowl Backend Running 🍓");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
