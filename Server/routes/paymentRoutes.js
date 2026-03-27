const router = require("express").Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/paymentController");

router.post("/initialize", auth, controller.initializePayment);
router.get("/verify/:reference", controller.verifyPayment);

module.exports = router;