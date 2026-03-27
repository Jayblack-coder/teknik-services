const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const controller = require("../controller/adminController");

router.get("/users", auth, admin, controller.getUsers);
router.get("/providers", auth, admin, controller.getProviders);
router.get("/payments", auth, admin, controller.getPayments);

module.exports = router;