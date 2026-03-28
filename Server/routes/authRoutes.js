const router = require("express").Router();
const controller = require("../controller/authController");

// AUTH
router.post("/register", controller.register);
router.post("/login", controller.login);

// PASSWORD RESET
router.post("/forgot-password", controller.forgotPassword);
router.post("/reset-password/:token", controller.resetPassword);

module.exports = router;