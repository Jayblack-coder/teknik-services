// const User = require("../models/User");
// const jwt = require("jsonwebtoken");
// // const bcrypt = require("bcryptjs");
// const crypto = require("crypto");

// // REGISTER
// exports.register = async (req, res) => {
//   try {
//      console.log("BODY:", req.body);
//     const { name, email, password, role } = req.body;

    

//     const user = await User.create({
//       name,
//       email,
//       password,
//       role
//     });

//     res.json(user);
//   } catch (err) {
//     console.log("REGISTER ERROR:", err.message);
//     res.status(500).json({ msg: err.message });
//   }
// };

// // LOGIN
// exports.login = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });

//     if (!user) return res.status(404).json({ msg: "User not found" });

//     const isMatch = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );

//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role, plan: user.plan },
//       process.env.JWT_SECRET
//     );

//     // remove password from response
//     const { password, ...userData } = user._doc;

//     res.json({ token, user: userData });

//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// // FORGOT PASSWORD
// exports.forgotPassword = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });

//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     const resetToken = crypto.randomBytes(32).toString("hex");

//     user.resetToken = resetToken;
//     user.resetTokenExpire = Date.now() + 10 * 60 * 1000;

//     await user.save();

//     const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

//     res.json({ msg: "Reset link generated", resetUrl });

//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// // RESET PASSWORD
// exports.resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;

//     const user = await User.findOne({
//       resetToken: token,
//       resetTokenExpire: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid or expired token" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(req.body.password, salt);

//     user.resetToken = undefined;
//     user.resetTokenExpire = undefined;

//     await user.save();

//     res.json({ msg: "Password reset successful" });

//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const Provider = require("../models/Provider");
// 🔐 HELPER: Generate Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, plan: user.plan },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ================= REGISTER =================
// 
exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      profession,
      location,
      phone
    } = req.body;

    if (!name || !email || !password) {
  return res.status(400).json({ msg: "All fields required" });
}

 if (role === "provider" && (!profession || !location || !phone)) {
      return res.status(400).json({ msg: "Provider details required" });
    }

    // 🚫 Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // 🔐 Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 👤 Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // 🧑‍🔧 AUTO CREATE PROVIDER PROFILE
    let provider = null;

    if (role === "provider") {
      provider = await Provider.create({
        userId: user._id,
        profession,
        location,
        phone,
        description: `${profession} based in ${location}`
      });
    }

    // 🎟 Token
    const token = jwt.sign(
      { id: user._id, role: user.role, plan: user.plan },
      process.env.JWT_SECRET
    );

    // 🔒 Remove password
    const { password: pwd, ...userData } = user._doc;

    res.json({
      token,
      user: userData,
      provider // will be null for subscribers
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err.message);
    res.status(500).json({ msg: err.message });
  }
};
// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // 🔐 COMPARE HASHED PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = generateToken(user);

    const { password: pwd, ...userData } = user._doc;

    res.json({ token, user: userData });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================= FORGOT PASSWORD =================
exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    res.json({ msg: "Reset link generated", resetUrl });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ================= RESET PASSWORD =================
// exports.resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;

//     const user = await User.findOne({
//       resetToken: token,
//       resetTokenExpire: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid or expired token" });
//     }

//     // 🔐 HASH NEW PASSWORD
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(req.body.password, salt);

//     user.resetToken = undefined;
//     user.resetTokenExpire = undefined;

//     await user.save();

//     res.json({ msg: "Password reset successful" });

//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// }; 

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired token" });
    }

    // 🔐 Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    user.resetToken = undefined;
    user.resetTokenExpire = undefined;

    await user.save();

    // 🎟 CREATE TOKEN (NEW)
    const newToken = jwt.sign(
      { id: user._id, role: user.role, plan: user.plan },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password, ...userData } = user._doc;

    res.json({
      msg: "Password reset successful",
      token: newToken,
      user: userData
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};