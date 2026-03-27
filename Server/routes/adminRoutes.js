const router = require("express").Router();
const User = require("../models/User");
const Provider = require("../models/Provider");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// 🔹 GET ALL USERS
router.get("/users", auth, admin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// 🔹 GET ALL PROVIDERS
router.get("/providers", auth, admin, async (req, res) => {
  const providers = await Provider.find().populate("userId", "name email");
  res.json(providers);
});

// 🔹 GET PAYMENTS (if you store them)
router.get("/payments", auth, admin, async (req, res) => {
  const payments = await Payment.find().populate("userId", "email");
  res.json(payments);
});

module.exports = router;