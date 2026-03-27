const Provider = require("../models/Provider");

// GET ALL PROVIDERS
exports.getProviders = async (req, res) => {
  try {
    const providers = await Provider.find().populate("userId", "name plan");

    const filtered = providers.map(p => {
      const provider = p.toObject();

      if (req.user.plan !== "premium") {
        provider.phone = null;
      }

      return provider;
    });

    res.json(filtered);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// CREATE PROVIDER
exports.createProvider = async (req, res) => {
  try {
    const provider = await Provider.create({
      ...req.body,
      userId: req.user.id
    });

    res.json(provider);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};