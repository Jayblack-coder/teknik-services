const router = require("express").Router();
const Service = require("../models/Service");

router.post("/", async (req, res) => {
  const service = await Service.create(req.body);
  res.json(service);
});

router.get("/", async (req, res) => {
  const services = await Service.find().populate("providerId");
  res.json(services);
});

module.exports = router;