const router = require("express").Router();
const Provider = require("../models/Provider");
const auth = require("../middleware/auth");

// GET ALL PROVIDERS (SECURED)
router.get("/", auth, async (req, res) => {
  try {
    const providers = await Provider.find().populate("userId", "name plan");

    const filteredProviders = providers.map((p) => {
      const provider = p.toObject();

      // 🔐 HIDE PHONE IF NOT PREMIUM
      if (req.user.plan !== "premium") {
        provider.phone = null;
      }

      return provider;
    });

    res.json(filteredProviders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;