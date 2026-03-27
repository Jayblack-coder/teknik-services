const User = require("../models/User");
const Provider = require("../models/Provider");
const Payment = require("../models/Payment");

// USERS
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// PROVIDERS
exports.getProviders = async (req, res) => {
  const providers = await Provider.find().populate("userId", "name email");
  res.json(providers);
};

// PAYMENTS
exports.getPayments = async (req, res) => {
  const payments = await Payment.find().populate("userId", "email");
  res.json(payments);
};