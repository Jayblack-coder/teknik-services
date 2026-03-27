const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  email: String,
  amount: Number,
  reference: String,
  status: String
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);