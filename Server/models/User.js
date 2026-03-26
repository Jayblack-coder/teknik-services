const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["subscriber", "provider", "admin"],
    default: "subscriber"
  },
  plan: {
    type: String,
    enum: ["basic", "premium"],
    default: "basic"
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);