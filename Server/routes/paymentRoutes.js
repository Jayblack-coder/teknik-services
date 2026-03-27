const router = require("express").Router();
const axios = require("axios");
const auth = require("../middleware/auth");

router.post("/initialize", auth, async (req, res) => {
  try {
    const { email, amount } = req.body;

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // Paystack uses kobo
        callback_url: "http://localhost:5173/payment-success"
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

const User = require("../models/User");

router.get("/verify/:reference", async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`
        }
      }
    );

    const data = response.data.data;

    if (data.status === "success") {
      // 🔥 Upgrade user
      const email = data.customer.email;

      await User.findOneAndUpdate(
        { email },
        { plan: "premium" }
      );

      return res.json({ msg: "Payment verified, upgraded!" });
    }

    res.status(400).json({ msg: "Payment not successful" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;