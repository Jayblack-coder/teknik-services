const router = require("express").Router();
const auth = require("../middleware/auth");
const controller = require("../controller/providerController");

router.get("/", auth, controller.getProviders);
router.post("/", auth, controller.createProvider);

module.exports = router;