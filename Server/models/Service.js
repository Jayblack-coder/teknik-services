const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
  title: String,
  category: String,
  priceRange: String
});

module.exports = mongoose.model("Service", serviceSchema);