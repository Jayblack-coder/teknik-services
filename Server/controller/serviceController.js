const Service = require("../models/Service");

// CREATE SERVICE
exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.json(service);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET SERVICES
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().populate("providerId");
    res.json(services);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};