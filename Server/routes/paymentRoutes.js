const router = require("express").Router();
const axios = require("axios");
const User = require("../models/User");
const Payment = require("../models/Payment"); 

// VERIFY PAYMENT
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
  const email = data.customer.email;
  const user = await User.findOne({ email });

  const reference = data.reference;

  // 🔐 CHECK DUPLICATE
  const existingPayment = await Payment.findOne({ reference });

  if (existingPayment) {
    return res.json({ msg: "Payment already processed" });
  }

 
 try {
  await Payment.create({
    userId: user._id,
    email,
    amount: data.amount / 100,
    reference,
    status: data.status
  });
} catch (err) {
  if (err.code === 11000) {
    return res.json({ msg: "Duplicate payment ignored" });
  }
  throw err;
}


  user.plan = "premium";
  await user.save();

  return res.json({ msg: "Payment verified & user upgraded" });
}
    

    res.status(400).json({ msg: "Payment not successful" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;