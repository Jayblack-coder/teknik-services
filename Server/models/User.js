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
  },
  resetToken: String,
resetTokenExpire: Date,
}, { timestamps: true });

const bcrypt = require("bcryptjs");

userSchema.pre("save", async function() {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
module.exports = mongoose.model("User", userSchema);