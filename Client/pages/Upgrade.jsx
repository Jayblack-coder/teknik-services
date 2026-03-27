import axios from "axios";

export default function Upgrade() {

  const handleUpgrade = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:3000/api/payment/initialize",
      {
        email: "user@email.com", // use logged-in user email
        amount: 2000 // ₦2000
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // 🔥 Redirect to Paystack
    window.location.href = res.data.data.authorization_url;
  };

  return (
    <button onClick={handleUpgrade}>
      Upgrade to Premium (₦2000)
    </button>
  );
}