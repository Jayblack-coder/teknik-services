require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://provider-portal-frontend.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

console.log("Starting server...");
console.log("MONGO_URI:", process.env.MONGO_URI);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/providers", require("./routes/providerRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });

})
.catch(err => {
  console.log("DB ERROR:", err);
});