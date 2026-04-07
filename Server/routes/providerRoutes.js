const router = require("express").Router();
const auth = require("../middleware/auth");
const controller = require("../controller/providerController");

// router.get("/", auth, controller.getProviders);
router.get("/", auth,  async (req, res) => {
  try {
    const { search, location, category } = req.query;

    let query = {};

    // 🔍 Search (profession or description)
    if (search) {
      query.$or = [
        { profession: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // 📍 Location filter
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // 🏷 Category filter
    if (category) {
      query.category = category;
    }

    const providers = await Provider.find(query)
      .populate("userId", "name plan");

    // 🔐 Hide phone if not premium
    const filtered = providers.map(p => {
      const obj = p.toObject();
      if (req.user.plan !== "premium") {
        obj.phone = null;
      }
      return obj;
    });

    res.json(filtered);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
router.post("/", auth, controller.createProvider);

module.exports = router;