const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  profession: String,
  description: String,
  location: String,
  phone: String,
  verified: { type: Boolean, default: false }
});

module.exports = mongoose.model("Provider", providerSchema);